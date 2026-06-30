@echo off
REM Запуск локального сервера для Pygmalion
echo ========================================
echo Запуск локального веб-сервера
echo ========================================
echo.
echo Открывайте в браузере:
echo http://localhost:8000
echo.
echo Для остановки нажмите Ctrl+C
echo ========================================
echo.

cd /d C:\pygmalion\sandbox-v0.3.26

REM Проверяем наличие Python
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo Используем Python...
    python -m http.server 8000
) else (
    echo Python не найден. Установите Python или используйте другой браузер (Chrome/Edge).
    pause
)
