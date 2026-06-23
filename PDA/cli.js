const { PDA } = require('./index');
const pda = new PDA();

const args = process.argv.slice(2);

function showHelp() {
  const actions = pda.resolve('help').actions || [];
  console.log('\nPDA-0 :: Pygmalion Digital Agent (CLI)');
  console.log(`Версия: ${pda.getStatus().version}`);
  console.log(`Канон:  ${pda.getStatus().canon}`);
  console.log(`Фаза:   ${pda.getStatus().phase}`);
  console.log(`Время:  ${pda.getStatus().time}`);
  console.log('\nИспользование:');
  console.log('  node PDA/cli.js <намерение> [параметры]');
  console.log('\nНамерения:');
  for (const a of actions) {
    console.log(`  ${a.key.padEnd(12)} ${a.label}`);
    if (a.protocol) console.log(`              ${a.protocol}`);
  }
  console.log('\nПримеры:');
  console.log('  node PDA/cli.js THRESHOLD ::имя::');
  console.log('  node PDA/cli.js PLAN ::имя:: T1');
  console.log('  node PDA/cli.js PLAN ::имя:: T1,T2,T3');
  console.log('  node PDA/cli.js MIRROR ::имя::');
  console.log('  node PDA/cli.js REPLAY');
  console.log('  node PDA/cli.js FLOW ::from:: ::to:: [ue_uuid]');
  console.log('');
}

function parseArgs(args) {
  const action = args[0];

  if (!action || action === 'help' || action === '--help' || action === '-h') {
    showHelp();
    process.exit(0);
  }

  const actionUpper = action.toUpperCase();

  const known = { PLAN: true, FLOW: true, MIRROR: true, REPLAY: true, THRESHOLD: true };

  if (!known[actionUpper]) {
    console.error(`Неизвестное намерение: "${action}"`);
    showHelp();
    process.exit(1);
  }

  const payload = {};

  switch (actionUpper) {
    case 'THRESHOLD':
      payload.ok_key = args[1];
      if (!payload.ok_key) {
        console.error('THRESHOLD требует ok_key (::имя::)');
        process.exit(1);
      }
      break;

    case 'PLAN':
      payload.actor_ok = args[1];
      if (!payload.actor_ok) {
        console.error('PLAN требует actor_ok (::имя::)');
        process.exit(1);
      }
      if (args[2]) {
        payload.triads = args[2].split(',').map(t => t.trim().toUpperCase());
      } else {
        payload.triads = ['T1'];
      }
      break;

    case 'MIRROR':
      payload.ok_id = args[1];
      if (!payload.ok_id) {
        console.error('MIRROR требует ok_id');
        process.exit(1);
      }
      break;

    case 'FLOW':
      payload.actor_ok = args[1];
      payload.target_ok = args[2];
      if (!payload.actor_ok || !payload.target_ok) {
        console.error('FLOW требует from и to');
        process.exit(1);
      }
      if (args[3]) payload.ue_uuid = args[3];
      break;

    case 'REPLAY':
      break;
  }

  return { action: actionUpper, payload };
}

async function main() {
  const { action, payload } = parseArgs(args);

  console.log(`\nPDA-0 :: ${action}`);
  console.log(`Payload: ${JSON.stringify(payload)}\n`);

  const intent = pda.resolve(action, payload);
  if (!intent.valid) {
    console.error(`Ошибка: ${intent.error}`);
    process.exit(1);
  }

  console.log(`Намерение распознано: ${intent.label}`);
  console.log(`Протокол: ${intent.protocol || '—'}`);
  console.log(`Действие: ${intent.action}\n`);

  const preview = pda.preview(intent);
  console.log('--- PREVIEW ---');
  console.log(JSON.stringify(preview, null, 2));

  if (preview.blocked) {
    console.log('\nИсполнение заблокировано. Запустите confirm для подтверждения.');
    process.exit(0);
  }

  const confirm = process.argv.includes('--yes') || process.argv.includes('-y');
  if (!confirm) {
    console.log('\n--- ОЖИДАНИЕ ПОДТВЕРЖДЕНИЯ ---');
    console.log('Исполнить? Для подтверждения добавьте --yes или -y');
    console.log(`  node PDA/cli.js ${args.join(' ')} --yes`);
    process.exit(0);
  }

  console.log('\n--- EXECUTION ---');
  const result = await pda.execute(intent);
  console.log(JSON.stringify(result, null, 2));

  if (result.success) {
    console.log('\n✓ Успешно');
  } else {
    console.log(`\n✗ Ошибка: ${result.error}`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('PDA CLI error:', err);
  process.exit(1);
});
