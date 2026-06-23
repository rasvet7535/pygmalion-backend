Graph Report - . (2026-06-14)
Corpus Check
Large corpus: 3163 files ┬╖ ~4┬а192┬а320 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.
Summary
22810 nodes · 46364 edges · 813 communities detected
Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 24 edges (avg confidence: 0.5)
Token cost: 0 input · 0 output
Edge kinds: contains: 22119 · calls: 9528 · imports: 7115 · imports_from: 5052 · re_exports: 2035 · references: 300 · method: 122 · rationale_for: 31 · reads_from: 30 · uses: 24 · triggers: 8
God Nodes (most connected - your core abstractions)
cn() - 135 edges
queryKeys - 121 edges
Button - 116 edges
execute() - 109 edges
useCompany() - 76 edges
Link - 70 edges
companies - 68 edges
useBreadcrumbs() - 51 edges
testEnvironment() - 47 edges
notFound() - 46 edges
Surprising Connections (you probably didn't know these)
execute() --calls--> readCodexTransientFallbackMode() [EXTRACTED] C:/pygmalion/paperclip/packages/adapters/pi-local/src/server/execute.ts → C:/pygmalion/paperclip/packages/adapters/codex-local/src/server/execute.ts
execute() --calls--> fallbackModeUsesSaferInvocation() [EXTRACTED] C:/pygmalion/paperclip/packages/adapters/pi-local/src/server/execute.ts → C:/pygmalion/paperclip/packages/adapters/codex-local/src/server/execute.ts
execute() --calls--> fallbackModeUsesFreshSession() [EXTRACTED] C:/pygmalion/paperclip/packages/adapters/pi-local/src/server/execute.ts → C:/pygmalion/paperclip/packages/adapters/codex-local/src/server/execute.ts
execute() --calls--> buildCodexTransientHandoffNote() [EXTRACTED] C:/pygmalion/paperclip/packages/adapters/pi-local/src/server/execute.ts → C:/pygmalion/paperclip/packages/adapters/codex-local/src/server/execute.ts
execute() --calls--> buildCursorSkillsDir() [EXTRACTED] C:/pygmalion/paperclip/packages/adapters/pi-local/src/server/execute.ts → C:/pygmalion/paperclip/packages/adapters/cursor-local/src/server/execute.ts
Communities
Community 0 - "Community 0"
Cohesion: 0.01 Nodes (373): AgentAdapterType, AgentRole, AgentStatus, IssuePriority, IssueStatus, AccessUserProfile, AdminUserDirectoryEntry, ArchiveCompanyMemberResponse (+365 more)
Community 1 - "Community 1"
Cohesion: 0.01 Nodes (370): agentAdapterTypeSchema, optionalAgentAdapterTypeSchema, AGENT_ADAPTER_TYPES, base, parsed, AcceptInvite, acceptInviteSchema, ArchiveCompanyMember (+362 more)
Community 2 - "Community 2"
Cohesion: 0.02 Nodes (210): useDisabledAdaptersSync(), accessApi, adaptersApi, AdapterModelProfile, AgentHireResponse, agentPath(), agentsApi, AgentWakeRequest (+202 more)
Community 3 - "Community 3"
Cohesion: 0.01 Nodes (275): deriveAgentUrlKey(), isUuidLike(), normalizeAgentUrlKey(), API, AGENT_ICON_NAMES, AGENT_ROLE_LABELS, AGENT_ROLES, AGENT_STATUSES (+267 more)
Community 4 - "Community 4"
Cohesion: 0.02 Nodes (165): ModeBadge(), userProfilesApi, AccountingModelCard(), SURFACES, ActivityRow(), ActivityRowProps, entityLink(), ApprovalCard() (+157 more)
Community 5 - "Community 5"
Cohesion: 0.01 Nodes (164): CompanySettingsNav(), CompanySettingsTab, getCompanySettingsTab(), items, button, navigateMock, pageTabBarMock, root (+156 more)
Community 6 - "Community 6"
Cohesion: 0.02 Nodes (136): validate(), accessRoutes(), activityRoutes(), createActivitySchema, agentRoutes(), approvalRoutes(), ALLOWED_COMPANY_LOGO_CONTENT_TYPES, assetRoutes() (+128 more)
Community 7 - "Community 7"
Cohesion: 0.01 Nodes (150): httpLogger, logDir, logFile, logger, sharedOpts, MIME_TYPES, PluginUiStaticRouteOptions, pluginUiStaticRoutes() (+142 more)
Community 8 - "Community 8"
Cohesion: 0.02 Nodes (145): activityApi, IssueForRun, RunForIssue, approvalsApi, budgetsApi, api, CatalogListQuery, companySkillsApi (+137 more)
Community 9 - "Community 9"
Cohesion: 0.02 Nodes (131): DocumentAnnotationListFilter, documentAnnotationsApi, CompanySwitcher(), CompanySwitcherProps, statusDotColor(), PendingAnchor, AnnotationFilter, AnnotationPanelBody() (+123 more)
Community 10 - "Community 10"
Cohesion: 0.02 Nodes (155): buildExecutionWorkspaceAdapterConfig(), cloneRecord(), defaultIssueExecutionWorkspaceSettingsForProject(), ExecutionWorkspaceEnvironmentConflict, ExecutionWorkspaceEnvironmentResolution, ExecutionWorkspaceEnvironmentSource, gateProjectExecutionWorkspacePolicy(), issueExecutionWorkspaceModeForPersistedWorkspace() (+147 more)
Community 11 - "Community 11"
Cohesion: 0.02 Nodes (124): AcceptInviteInput, AdminUserDirectoryEntry, AgentJoinRequestAccepted, ArchiveCompanyMemberResponse, BoardClaimStatus, CliAuthChallengeStatus, CompanyInviteCreated, CompanyInviteListResponse (+116 more)
Community 12 - "Community 12"
Cohesion: 0.02 Nodes (118): AgentIcon(), AgentIconPickerProps, AgentIconProps, ExecutionParticipantPickerProps, StageType, IssueLinkQuicklook, IssueQuicklookCard(), issue (+110 more)
Community 13 - "Community 13"
Cohesion: 0.02 Nodes (123): ImageGalleryModal(), ImageGalleryModalProps, IssueMonitorActivityCard(), IssueMonitorActivityCardProps, resolveScheduledMonitor(), button, onCheckNow, root (+115 more)
Community 14 - "Community 14"
Cohesion: 0.01 Nodes (103): ACTIVE_REVIEW_APPROVAL_STATUSES, ActivityExecutionParticipant, ActivityIssueRelationSummary, buildExecutionStageWakeContext(), buildExecutionStageWakeup(), buildIssueWorkspaceChangeActivityDetails(), CheckoutWakeInput, shouldWakeAssigneeOnCheckout() (+95 more)
Community 15 - "Community 15"
Cohesion: 0.02 Nodes (159): allocatePort(), buildExecutionWorkspaceCleanupEnv(), buildTemplateData(), buildWorkspaceCommandEnv(), cleanupExecutionWorkspaceArtifacts(), clearIdleTimer(), detectDefaultBranch(), directoryExists() (+151 more)
Community 16 - "Community 16"
Cohesion: 0.01 Nodes (95): ActivityIcon, AlertTriangleIcon, ArchiveIcon, AutosaveStatus, BASELINE_DIRECTORIES, BASELINE_FILES, BASELINE_TREE_ORDER, BookOpenIcon (+87 more)
Community 17 - "Community 17"
Cohesion: 0.02 Nodes (104): RECOVERY_MODEL_PROFILE_HINT_KEYS, RECOVERY_MODEL_PROFILE_KEY, recoveryAssigneeAdapterOverrides(), RecoveryModelProfileHintKey, RecoveryModelProfileWorkClass, scrubRecoveryModelProfileHints(), STATUS_ONLY_RECOVERY_GUARD_CONTEXT, WithoutRecoveryModelProfileHints (+96 more)
Community 18 - "Community 18"
Cohesion: 0.03 Nodes (121): assetService(), ADAPTER_DEFAULT_RULES_BY_TYPE, AgentLike, appendCodexImportArg(), appendSkillExportDirSuffix(), applyImportAdapterRunDefaults(), applySelectedFilesToSource(), asBoolean() (+113 more)
Community 19 - "Community 19"
Cohesion: 0.07 Nodes (143): activateImpulseUE(), addWeeklyEvent(), AppState, buildCanonicalRecord(), calculateBurnAt(), calculateInvestorStatuses(), calculateSpiritualDynamics(), calculateWeight() (+135 more)
Community 20 - "Community 20"
Cohesion: 0.02 Nodes (128): MaybeId, resolveIssueGoalId(), resolveNextIssueGoalId(), ACCEPTED_PLAN_DECOMPOSITION_FINGERPRINT_CHILD_METADATA_KEYS, AcceptedPlanDecompositionInput, AcceptedPlanDocumentInteraction, ACTIVE_RUN_STATUSES, activeRunMapForIssues() (+120 more)
Community 21 - "Community 21"
Cohesion: 0.02 Nodes (117): BuildInvocationEnvForLogsOptions, collectEnvironmentSecretRefs(), createEnvironmentSecret(), fakeSandboxEnvironmentConfigSchema, getSandboxProvider(), getSandboxProviderConfigSchema(), normalizeEnvironmentConfig(), normalizeEnvironmentConfigForPersistence() (+109 more)
Community 22 - "Community 22"
Cohesion: 0.02 Nodes (97): emptyRow(), EnvVarEditor(), Row, toRows(), areIssueChatMessageRowPropsEqual(), cleanToolDisplayText(), commentDateLabel(), CommentReassignment (+89 more)
Community 23 - "Community 23"
Cohesion: 0.02 Nodes (115): AuthApiError, AuthErrorBody, authPatch(), authPost(), extractAuthError(), AvailableBundledPlugin, PluginDashboardData, PluginDashboardJobRun (+107 more)
Community 24 - "Community 24"
Cohesion: 0.02 Nodes (108): AvailableBundledPlugin, bundledPluginMetadata(), __dirname, discoverBundledPlugins(), EXPERIMENTAL_BUNDLED_PLUGIN_PACKAGE_NAMES, fileExists(), findPackageJsonFiles(), firstStringLiteral() (+100 more)
Community 25 - "Community 25"
Cohesion: 0.02 Nodes (91): AdapterDisplayInfo, adapterDisplayMap, getAdapterDisplay(), getAdapterLabel(), getAdapterLabels(), getTypeSuffix(), humanizeType(), TYPE_SUFFIXES (+83 more)
Community 26 - "Community 26"
Cohesion: 0.02 Nodes (85): CommandPalette(), CompanySettingsSidebar(), InstanceSidebar(), IssueGroupHeader(), IssueGroupHeaderProps, KeyboardShortcutsCheatsheet(), KeyboardShortcutsCheatsheetContent(), sections (+77 more)
Community 27 - "Community 27"
Cohesion: 0.03 Nodes (109): acquireMaterializeLock(), appendWithByteCap(), applyPaperclipWorkspaceEnv(), asBoolean(), asNumber(), asString(), buildInvocationEnvForLogs(), buildManagedSkillOrigin() (+101 more)
Community 28 - "Community 28"
Cohesion: 0.02 Nodes (86): ACTIVITY_ACTION_TO_PLUGIN_EVENT, eventTypeForActivityAction(), logActivity(), LogActivityInput, PLUGIN_EVENT_SET, publishPluginDomainEvent(), setPluginEventBus(), approvalService() (+78 more)
Community 29 - "Community 29"
Cohesion: 0.02 Nodes (90): getUtcMonthStart(), BOUNDED_TRANSIENT_HEARTBEAT_RETRY_DELAYS_MS, heartbeatService(), inboxDismissalService(), ActivityService, agentId, companyId, completedAt (+82 more)
Community 30 - "Community 30"
Cohesion: 0.05 Nodes (73): printCursorCloudEvent(), normalizeOpenClawGatewayStreamLine(), TurnBoundaryState, buildAcpxLocalConfig(), buildClaudeLocalConfig(), buildCodexLocalConfig(), buildCursorCloudConfig(), buildCursorLocalConfig() (+65 more)
Community 31 - "Community 31"
Cohesion: 0.02 Nodes (108): WIKI_MAINTAINER_SKILL_CANONICAL_KEY, WIKI_MAINTENANCE_ROUTINE_KEYS, WIKI_MANAGED_SKILL_CANONICAL_KEYS, WIKI_MANAGED_SKILL_KEYS, BOOTSTRAP_FILES, DEFAULT_AGENT_INSTRUCTION_FILES, DEFAULT_GITIGNORE, DEFAULT_IDEA (+100 more)
Community 32 - "Community 32"
Cohesion: 0.03 Nodes (81): InboxIssueMetaLeading(), InboxIssueTrailingColumns(), issueActivityText(), issueColumnDescriptions, issueColumnLabels, IssueColumnPicker(), issueTrailingColumns, issueTrailingGridTemplate() (+73 more)
Community 33 - "Community 33"
Cohesion: 0.04 Nodes (92): appendWakeText(), asRecord(), asStringEnvMap(), autoApproveDevicePairing(), base64UrlEncode(), buildAgentOptions(), buildInstructionsPrefix(), buildPaperclipEnvForWake() (+84 more)
Community 34 - "Community 34"
Cohesion: 0.04 Nodes (82): asRecord(), assertCloudSyncEnabled(), assertDiscoveryCompatible(), authorizeConnection(), authorizeWithBrowser(), authorizeWithDeviceCode(), buildBundleFromLocalCompany(), buildEntitiesFromPortableExport() (+74 more)
Community 35 - "Community 35"
Cohesion: 0.02 Nodes (88): affectedPagePathsFromRunMetadata(), assertSourceWithinConfiguredLimit(), BootstrapInput, buildQueryPrompt(), byteLength(), CaptureSourceInput, conceptBullet(), CreateSpaceInput (+80 more)
Community 36 - "Community 36"
Cohesion: 0.02 Nodes (94): activityIssueId, advancedIssueIds, agentId, anchorCommentId, archivedIssueId, assignedIssueId, assigneeAgentId, assigneeEnvironmentId (+86 more)
Community 37 - "Community 37"
Cohesion: 0.03 Nodes (63): attachErrorContext(), ErrorContext, errorHandler(), shouldExposeTrustedCloudTenantImportError(), createFeedbackTraceShareClientFromConfig(), FeedbackTraceShareClient, Config, badRequest() (+55 more)
Community 38 - "Community 38"
Cohesion: 0.04 Nodes (84): asString(), auditInstalledSkillBytes(), buildInventoryContentHash(), buildMissingLocalSourceMarker(), buildMissingRuntimeSourceDetail(), buildSkillRuntimeName(), collectLocalSkillInventory(), collectSkillFileBytes() (+76 more)
Community 39 - "Community 39"
Cohesion: 0.03 Nodes (58): ApiError, request(), resolveIssueChatTranscriptRuns(), runs, apiErrorCode(), DraftSelection, eligibleVaults(), EMPTY_PREVIEW (+50 more)
Community 40 - "Community 40"
Cohesion: 0.03 Nodes (59): ALL_FALSE, KNOWN_DEFAULTS, useAdapterCapabilities(), AdapterCapabilities, AdapterInfo, AdapterInstallResult, AgentKey, AgentPermissionUpdate (+51 more)
Community 41 - "Community 41"
Cohesion: 0.03 Nodes (67): WatchdogDecisionInput, ACTIVE_RUN_STATUSES, asRecord(), canBoardRecordWatchdogDecision(), childIssueSummary(), compactAgentName(), formatSilenceAge(), isActiveRun() (+59 more)
Community 42 - "Community 42"
Cohesion: 0.05 Nodes (71): main(), parseArgs(), ProbeArgs, stringifyError(), AnthropicExtraUsage, AnthropicUsageResponse, AnthropicUsageWindow, base64UrlDecode() (+63 more)
Community 43 - "Community 43"
Cohesion: 0.04 Nodes (67): actionChip(), appendMessageBlock(), appendPreviewExamples(), assertDeleteConfirmation(), buildCompanyDashboardUrl(), buildDefaultImportAdapterMessages(), buildDefaultImportAdapterOverrides(), buildDefaultImportSelectionState() (+59 more)
Community 44 - "Community 44"
Cohesion: 0.03 Nodes (54): aggregateRuns(), ChartCard(), getLast14Days(), IssueStatusChart(), PriorityChart(), priorityColors, priorityOrder, resolveRunActivity() (+46 more)
Community 45 - "Community 45"
Cohesion: 0.05 Nodes (80): createPluginBundlerPresets(), EsbuildLikeOptions, PluginBundlerPresetInput, PluginBundlerPresets, RollupLikeConfig, PluginPerformActionContext, AgentSession, AgentSessionEvent (+72 more)
Community 46 - "Community 46"
Cohesion: 0.04 Nodes (71): AdapterCommandCapableExecutionTarget, adapterExecutionTargetCommandRunner(), adapterExecutionTargetFromRemoteExecution(), AdapterExecutionTargetPaperclipBridgeHandle, AdapterExecutionTargetProcessOptions, adapterExecutionTargetRemoteCwd(), adapterExecutionTargetSessionIdentity(), adapterExecutionTargetSessionMatches() (+63 more)
Community 47 - "Community 47"
Cohesion: 0.05 Nodes (68): activateImpulseUE(), AppState, buildCanonicalRecord(), calculateBurnAt(), calculateSpiritualDynamics(), calculateWeight(), canTransferBySystem(), closeAllModals() (+60 more)
Community 48 - "Community 48"
Cohesion: 0.05 Nodes (68): activateImpulseUE(), AppState, buildCanonicalRecord(), calculateBurnAt(), calculateSpiritualDynamics(), calculateWeight(), canTransferBySystem(), closeAllModals() (+60 more)
Community 49 - "Community 49"
Cohesion: 0.05 Nodes (68): activateImpulseUE(), AppState, buildCanonicalRecord(), calculateBurnAt(), calculateSpiritualDynamics(), calculateWeight(), canTransferBySystem(), closeAllModals() (+60 more)
Community 50 - "Community 50"
Cohesion: 0.05 Nodes (67): activateImpulseUE(), AppState, buildCanonicalRecord(), calculateBurnAt(), calculateSpiritualDynamics(), calculateWeight(), canTransferBySystem(), closeAllModals() (+59 more)
Community 51 - "Community 51"
Cohesion: 0.05 Nodes (67): activateImpulseUE(), AppState, buildCanonicalRecord(), calculateBurnAt(), calculateSpiritualDynamics(), calculateWeight(), canTransferBySystem(), closeAllModals() (+59 more)
Community 52 - "Community 52"
Cohesion: 0.05 Nodes (67): activateImpulseUE(), AppState, buildCanonicalRecord(), calculateBurnAt(), calculateSpiritualDynamics(), calculateWeight(), canTransferBySystem(), closeAllModals() (+59 more)
Community 53 - "Community 53"
Cohesion: 0.03 Nodes (53): ExecutionParticipantPicker(), FoldCurtain(), FoldCurtainProps, useResponsiveCollapsedHeight(), InlineEditor(), InlineEditorProps, applyMention(), autocompleteMarkdown() (+45 more)
Community 54 - "Community 54"
Cohesion: 0.03 Nodes (76): buildWorktreeConfig(), rewriteLocalUrlPort(), activeApiRoutineId, activeScheduledRoutineId, agentId, archivedScheduledRoutineId, checkoutDir, companyId (+68 more)
Community 55 - "Community 55"
Cohesion: 0.03 Nodes (66): canStopIssueChatRun(), acceptButton, { appendMock }, attachmentList, cancelButton, { captureComposerViewportSnapshotMock, restoreComposerViewportSnapshotMock, shouldPreserveComposerViewportMock, }, childCheckbox, comments (+58 more)
Community 56 - "Community 56"
Cohesion: 0.03 Nodes (68): getInboxWorkItems(), InboxWorkItem, isMineInboxTab(), loadInboxWorkItemGroupBy(), loadLastInboxTab(), resolveInboxNestingEnabled(), resolveInboxSelectionIndex(), saveInboxWorkItemGroupBy() (+60 more)
Community 57 - "Community 57"
Cohesion: 0.04 Nodes (57): getConfiguredSecretProvider(), advanceToNextMonth(), FIELD_SPECS, FieldSpec, findNext(), nextCronTick(), nextCronTickFromExpression(), parseCron() (+49 more)
Community 58 - "Community 58"
Cohesion: 0.04 Nodes (57): confirmButton, declineButton, enabledSaveButton, host, jumpLink, multiGroup, onAcceptInteraction, onRejectInteraction (+49 more)
Community 59 - "Community 59"
Cohesion: 0.06 Nodes (66): asNumber(), asObject(), asString(), buildRemoteExecutionSessionIdentity(), PreparedRemoteManagedRuntime, prepareRemoteManagedRuntime(), remoteExecutionSessionMatches(), RemoteManagedRuntimeAsset (+58 more)
Community 60 - "Community 60"
Cohesion: 0.05 Nodes (63): inferOpenAiCompatibleBiller(), readEnv(), AdapterExecutionTarget, HOME_PATH_PATTERNS, HomePathRedactionOptions, redactHomePathUserSegments(), redactHomePathUserSegmentsInValue(), redactTranscriptEntryPaths() (+55 more)
Community 61 - "Community 61"
Cohesion: 0.06 Nodes (60): AppState, buildCanonicalRecord(), calculateBurnAt(), calculateSpiritualDynamics(), calculateWeight(), canTransferBySystem(), closeAllModals(), closeTransferConfirmModal() (+52 more)
Community 62 - "Community 62"
Cohesion: 0.06 Nodes (60): AppState, buildCanonicalRecord(), calculateBurnAt(), calculateSpiritualDynamics(), calculateWeight(), canTransferBySystem(), closeAllModals(), closeTransferConfirmModal() (+52 more)
Community 63 - "Community 63"
Cohesion: 0.05 Nodes (55): configure(), defaultConfig(), Section, SECTION_LABELS, dbBackupCommand(), DbBackupOptions, normalizeRetentionDays(), resolveBackupDir() (+47 more)
Community 64 - "Community 64"
Cohesion: 0.05 Nodes (66): PaperclipPlugin, PluginApiRequestInput, PluginApiResponse, PluginConfigValidationResult, PluginDefinition, PluginHealthDiagnostics, PluginWebhookInput, ConfigChangedParams (+58 more)
Community 65 - "Community 65"
Cohesion: 0.05 Nodes (42): activityLog, agentApiKeys, agentConfigRevisions, agentMemberships, agentRuntimeState, agentTaskSessions, cloudUpstreamConnections, cloudUpstreamRuns (+34 more)
Community 66 - "Community 66"
Cohesion: 0.03 Nodes (40): AgentRecord, buttonStyle, cardStyle, codeStyle, CommentContextData, CompanyRecord, EntityRecord, GoalRecord (+32 more)
Community 67 - "Community 67"
Cohesion: 0.08 Nodes (63): acts, acts24h, allOKResult, app, burn_echo, burnAt, burned_recently, burnedDetails (+55 more)
Community 68 - "Community 68"
Cohesion: 0.05 Nodes (62): applyMergePlan(), ClosableDb, collectClaimedWorktreePorts(), collectMergePlan(), ConfiguredStorage, CopiedGitHooksResult, createConfiguredStorageFromPaperclipConfig(), dynamicImport (+54 more)
Community 69 - "Community 69"
Cohesion: 0.04 Nodes (57): isAutomaticRecoverySuppressedByPauseHold(), IssueTreeControlService, ACTIVE_RUN_STATUSES, ActiveCancelSnapshot, ActiveIssueTreePauseHoldGate, ActiveRunRow, ActorInput, actorMatchesComment() (+49 more)
Community 70 - "Community 70"
Cohesion: 0.06 Nodes (49): configCheck(), addAllowedHostname(), bootstrapCeoInvite(), createInviteToken(), hashToken(), resolveBaseUrl(), resolveDbUrl(), doctor() (+41 more)
Community 71 - "Community 71"
Cohesion: 0.05 Nodes (44): ActivityListOptions, registerActivityCommands(), AgentListOptions, AgentLocalCliOptions, CreatedAgentKey, __moduleDir, registerAgentCommands(), SkillsInstallSummary (+36 more)
Community 72 - "Community 72"
Cohesion: 0.06 Nodes (54): asRecord(), buildCodexExecArgs(), BuildCodexExecArgsResult, formatFastModeSupportedModels(), readExtraArgs(), result, COPIED_SHARED_FILES, createExpectedSymlink() (+46 more)
Community 73 - "Community 73"
Cohesion: 0.06 Nodes (51): isAuthorizedRequest(), readBearerToken(), request, timingSafeStringEqual(), BridgeExecuteParams, buildLoginShellScript(), coerceExecuteResult(), executeInSandbox() (+43 more)
Community 74 - "Community 74"
Cohesion: 0.05 Nodes (50): addCompanyMemberRemovalAccess(), agentJoinGrantsFromDefaults(), assertCanManageCompanyMember(), AvailableSkill, companyInviteExpiresAt(), CompanyMemberRecord, defaultInviteResolutionNetwork, getProtectedMemberReason() (+42 more)
Community 75 - "Community 75"
Cohesion: 0.04 Nodes (50): BudgetEnforcementScope, budgetService(), BudgetServiceHooks, computeObservedAmount(), currentUtcMonthWindow(), IncidentRow, PolicyRow, resolveWindow() (+42 more)
Community 76 - "Community 76"
Cohesion: 0.05 Nodes (53): buildPluginInitNextCommands(), buildPluginInitScaffoldOptions(), buildPluginInstallRequest(), expandHomePath(), hasLocalPathSyntax(), isExistingRelativePath(), packageToDirName(), PluginInitOptions (+45 more)
Community 77 - "Community 77"
Cohesion: 0.03 Nodes (59): alphaIssue, assignedIssue, backlogIssue, backlogIssues, betaIssue, blockedIssue, blockerButtons, button (+51 more)
Community 78 - "Community 78"
Cohesion: 0.07 Nodes (46): buildOpenCodeSkillsDir(), claudeSkillsHome(), ensureOpenCodeSkillsInjected(), discoverOpenCodeModels(), discoverOpenCodeModelsCached(), discoverPiModels(), discoverPiModelsCached(), discoveryCache (+38 more)
Community 79 - "Community 79"
Cohesion: 0.05 Nodes (38): buildCreateParams(), buildLoginShellScript(), buildResources(), buildSandboxCreateParams(), buildSandboxLabels(), buildTimeoutExecuteResult(), connectForCleanup(), connectSandbox() (+30 more)
Community 80 - "Community 80"
Cohesion: 0.07 Nodes (52): AppState, calculateBurnAt(), calculateSpiritualDynamics(), calculateWeight(), canTransferBySystem(), closeAllModals(), DOMAIN_MAP, emitUE() (+44 more)
Community 81 - "Community 81"
Cohesion: 0.03 Nodes (58): PLUGIN_RESERVED_COMPANY_ROUTE_SEGMENTS, entityScopedLauncherPlacementZones, InstallPlugin, installPluginSchema, jsonSchemaSchema, launcherBoundsByEnvironment, ListPluginState, listPluginStateSchema (+50 more)
Community 82 - "Community 82"
Cohesion: 0.05 Nodes (44): defaultPermissionsForRole(), normalizeAgentPermissions(), NormalizedAgentPermissions, AgentConfigSnapshot, agentService(), AgentShortnameCollisionOptions, AgentShortnameRow, CONFIG_REVISION_FIELDS (+36 more)
Community 83 - "Community 83"
Cohesion: 0.07 Nodes (59): AcpxExecutionPhase, AcpxPreparedRuntime, AcpxRuntimeFactory, applySessionConfigOptions(), buildPrompt(), buildRuntime(), buildSessionParams(), buildSkillSetKey() (+51 more)
Community 84 - "Community 84"
Cohesion: 0.05 Nodes (50): authorizeSandboxCallbackBridgeRequestWithRoutes(), buildRemotePidLockAcquireScript(), buildRemotePidLockCleanupScript(), buildRunnerFailureMessage(), buildSandboxCallbackBridgeEnv(), createCommandManagedSandboxCallbackBridgeQueueClient(), createFileSystemSandboxCallbackBridgeQueueClient(), createSandboxCallbackBridgeAsset() (+42 more)
Community 85 - "Community 85"
Cohesion: 0.05 Nodes (38): GrantInput, MemberArchiveInput, MembershipRow, AgentHierarchyRow, agentIsInSubtree(), AssignmentPolicyEffect, AuthorizationAction, AuthorizationActor (+30 more)
Community 86 - "Community 86"
Cohesion: 0.05 Nodes (40): AgentSkillSyncOptions, appendQueryParam(), auditCompanySkills(), CatalogBrowseOptions, CatalogInstallOptions, checkCompanySkills(), CompanySkillCheckRow, CompanySkillReferenceTarget (+32 more)
Community 87 - "Community 87"
Cohesion: 0.05 Nodes (46): CommandManagedRuntimeAsset, CommandManagedRuntimeRunner, CommandManagedRuntimeSpec, createCommandManagedRuntimeClient(), mergeRuntimeExcludes(), prepareCommandManagedRuntime(), shellQuote(), calls (+38 more)
Community 88 - "Community 88"
Cohesion: 0.06 Nodes (48): addInlineMarkdownText(), anchorSnapshotToSelector(), buildAnchorSnapshot(), Candidate, createDocumentAnchorSelector(), CreateDocumentAnchorSelectorOptions, findFuzzyCandidate(), findOccurrences() (+40 more)
Community 89 - "Community 89"
Cohesion: 0.08 Nodes (43): databaseCheck(), deploymentAuthCheck(), CheckResult, llmCheck(), logCheck(), portCheck(), storageCheck(), AuthConfig (+35 more)
Community 90 - "Community 90"
Cohesion: 0.04 Nodes (47): activeHold, activePauseHoldState, applyResumeButton, bodyScrollRegion, cancelApplyButton, cancelHold, cancelMenuButton, chatPauseButton (+39 more)
Community 91 - "Community 91"
Cohesion: 0.08 Nodes (42): buildClaudeRuntimeConfig(), buildLoginResult(), ClaudeExecutionInput, ClaudeRuntimeConfig, claudeSessionCwdMatchesExecutionTarget(), runClaudeLogin(), BEDROCK_MODELS, dedupeModels() (+34 more)
Community 92 - "Community 92"
Cohesion: 0.07 Nodes (53): ActionBar, ActionBarItem, ActionBarProps, AssigneePicker, AssigneePickerProps, AssigneePickerSelection, DataTable, DataTableColumn (+45 more)
Community 93 - "Community 93"
Cohesion: 0.08 Nodes (46): AppState, calculateBurnAt(), calculateWeight(), canTransferBySystem(), closeAllModals(), emitUE(), filterByNormRule(), generateTxId() (+38 more)
Community 94 - "Community 94"
Cohesion: 0.06 Nodes (46): ResolvedClientContext, asRecord(), buildFeedbackTraceQuery(), buildFeedbackVoteRecord(), collectJsonFilesForArchive(), compactText(), crc32(), createStoredZipArchive() (+38 more)
Community 95 - "Community 95"
Cohesion: 0.04 Nodes (46): additionalDirectories, baseConfig, codexHome, ctx, cwd, ensureCommandMock, ensureRuntimeInstalledMock, envFileNames (+38 more)
Community 96 - "Community 96"
Cohesion: 0.07 Nodes (39): asStringEnvMap(), buildCredentialHintChecks(), buildPiModelDiscoveryFailureCheck(), checkDirectory(), credentialSource(), firstNonEmptyLine(), getStringEnv(), GrokModelsProbe (+31 more)
Community 97 - "Community 97"
Cohesion: 0.07 Nodes (38): buildCursorSkillsDir(), cursorSkillsHome(), ensureCursorSkillsInjected(), EnsureCursorSkillsInjectedOptions, resolveProviderFromModel(), asErrorText(), collectAssistantText(), isCursorUnknownSessionError() (+30 more)
Community 98 - "Community 98"
Cohesion: 0.08 Nodes (39): buildGeminiSkillsDir(), ensureGeminiSkillsInjected(), geminiSkillsHome(), hasNonEmptyEnvValue(), isBedrockAuth(), __moduleDir, renderApiAccessNote(), renderPaperclipEnvNote() (+31 more)
Community 99 - "Community 99"
Cohesion: 0.04 Nodes (46): definePlugin(), createErrorResponse(), createRequest(), createSuccessResponse(), isJsonRpcErrorResponse(), isJsonRpcRequest(), isJsonRpcResponse(), isJsonRpcSuccessResponse() (+38 more)
Community 100 - "Community 100"
Cohesion: 0.07 Nodes (43): __dirname, ensureNpmAuth(), formatCommand(), inspectNpmPackage(), main(), normalizePath(), parseArgs(), printNextSteps() (+35 more)
Community 101 - "Community 101"
Cohesion: 0.10 Nodes (48): addFileToSnapshot(), BIND_MODES, BindMode, buildPluginSdk(), clearDevIntervals(), clearDevServerStatus(), cliArgs, collectWatchedSnapshot() (+40 more)
Community 102 - "Community 102"
Cohesion: 0.05 Nodes (43): ACTIONABLE_APPROVAL_STATUSES, buildInboxDismissedAtByKey(), buildInboxIssueGroupCreateDefaults(), computeInboxBadgeData(), defaultInboxFilterPreferences, FAILED_RUN_STATUSES, filterInboxIssues(), firstIssueFromInboxWorkItems() (+35 more)
Community 103 - "Community 103"
Cohesion: 0.07 Nodes (44): buildExportRow(), buildQueryKey(), buildSearchQuery(), buildSummary(), CachedCommit, CachedCommitStats, CacheFile, CliOptions (+36 more)
Community 104 - "Community 104"
Cohesion: 0.10 Nodes (42): addDAGNode(), AppState, calculateBurnAt(), calculateWeight(), emitUE(), generateTxId(), getCorrectLength(), getCurrentPhase() (+34 more)
Community 105 - "Community 105"
Cohesion: 0.09 Nodes (40): AppState, calculateBurnAt(), calculateWeight(), emitUE(), generateTxId(), getCorrectLength(), getCurrentPhase(), getInternalTime() (+32 more)
Community 106 - "Community 106"
Cohesion: 0.07 Nodes (29): Condition, extract_frontmatter(), from_dict(), load_rule_file(), load_rules(), A single condition for matching., Load all hookify rules from .claude directory. Args: event: Optiona, Load a single rule file. Returns: Rule object or None if file is in (+21 more)
Community 107 - "Community 107"
Cohesion: 0.11 Nodes (29): asNumber(), asRecord(), asString(), errorText(), extractTextContent(), parseJson(), pickToolUseId(), printAcpxStreamEvent() (+21 more)
Community 108 - "Community 108"
Cohesion: 0.04 Nodes (34): IssueChatThread(), useStableEvent(), EMPTY_COMMENTS, EMPTY_LINKED_RUNS, EMPTY_LIVE_RUNS, EMPTY_TIMELINE_EVENTS, RunChatSurface, RunChatSurfaceProps (+26 more)
Community 109 - "Community 109"
Cohesion: 0.05 Nodes (39): crc32(), createStoredZipArchive(), writeUint16(), writeUint32(), child, cliContext, createBasePaperclipEnv(), createCliEnv() (+31 more)
Community 110 - "Community 110"
Cohesion: 0.08 Nodes (36): probeEnvironment(), AcquireSandboxLeaseInput, acquireSandboxProviderLease(), assertProviderConfig(), buildFakeSandboxProbe(), DestroySandboxLeaseInput, destroySandboxProviderLease(), FakeSandboxProvider (+28 more)
Community 111 - "Community 111"
Cohesion: 0.06 Nodes (40): ApplyPluginMigrationsOptions, assertAllowedPublicRead(), assertIdentifier(), assertNoBannedSql(), derivePluginDatabaseNamespace(), extractQualifiedRefs(), normaliseSql(), PluginDatabaseClient (+32 more)
Community 112 - "Community 112"
Cohesion: 0.09 Nodes (41): BUILTIN_ADAPTER_TYPES, buildExternalAdapters(), extractUiParserSource(), getOrExtractUiParserSource(), getUiParserSource(), loadExternalAdapterPackage(), loadFromRecord(), reloadExternalAdapter() (+33 more)
Community 113 - "Community 113"
Cohesion: 0.07 Nodes (36): acpxLocalAdapter, buildCursorRuntimeCommandSpec(), buildNpmRuntimeCommandSpec(), builtinFallbacks, claudeLocalAdapter, codexLocalAdapter, cursorCloudAdapter, cursorLocalAdapter (+28 more)
Community 114 - "Community 114"
Cohesion: 0.24 Nodes (42): ACT_TYPES, addDAGEdge(), addDAGNode(), addInitialGiftTransactions(), appendAct(), cancelTemporary(), cleanupExpiredTemporaries(), cleanupOldTransactions() (+34 more)
Community 115 - "Community 115"
Cohesion: 0.06 Nodes (41): FEEDBACK_DATA_SHARING_PREFERENCES, FEEDBACK_TARGET_TYPES, FEEDBACK_TRACE_STATUSES, FEEDBACK_VOTE_VALUES, FeedbackDataSharingPreference, FeedbackTargetType, FeedbackTrace, FeedbackTraceBundle (+33 more)
Community 116 - "Community 116"
Cohesion: 0.05 Nodes (35): redactDetectedSuccessfulRunProgressSummaryForBoard(), activityDetailsText, agentId, blockedAssigneeAgentId, blockedIssueId, blockerIssueId, child, childProcesses (+27 more)
Community 117 - "Community 117"
Cohesion: 0.10 Nodes (39): AppState, calculateBurnAt(), calculateWeight(), emitUE(), generateTxId(), getCorrectLength(), getCurrentPhase(), getInternalTime() (+31 more)
Community 118 - "Community 118"
Cohesion: 0.10 Nodes (39): AppState, calculateBurnAt(), calculateWeight(), emitUE(), generateTxId(), getCorrectLength(), getCurrentPhase(), getInternalTime() (+31 more)
Community 119 - "Community 119"
Cohesion: 0.06 Nodes (29): AppState, closeAllModals(), DOMAIN_MAP, initCrossTransactionFramework(), initDailyPlanner(), initDepartmentsGrid(), initDevPanel(), initGratitudeReasonHandler() (+21 more)
Community 120 - "Community 120"
Cohesion: 0.05 Nodes (38): addButton, addLabelButton, blockerLink, bugButton, candidateButton, clearButton, clearParentButton, confirmButton (+30 more)
Community 121 - "Community 121"
Cohesion: 0.06 Nodes (24): companySearchBranchFetchLimit(), companySearchService(), createSnippet(), extractFirstImageUrl(), findFirstMatchIndex(), highlightRanges(), iso(), issueHref() (+16 more)
Community 122 - "Community 122"
Cohesion: 0.07 Nodes (39): cloneRecord(), execFileAsync, ExecutionWorkspaceRow, executionWorkspaceService(), inspectGitCloseReadiness(), isRecord(), mergeExecutionWorkspaceConfig(), pathExists() (+31 more)
Community 123 - "Community 123"
Cohesion: 0.09 Nodes (41): appendNote(), asBoolean(), asNumber(), asRecord(), asString(), buildAgentContext(), buildClaudeTraceFiles(), buildCodexTraceFiles() (+33 more)
Community 124 - "Community 124"
Cohesion: 0.05 Nodes (36): AppState, clearBtn, closeTransactionsRegistry, closeUzRegistry, d, devPanelContent, devTimeButtons, devTimeStatus (+28 more)
Community 125 - "Community 125"
Cohesion: 0.17 Nodes (42): ACT_TYPES, addDAGEdge(), addDAGNode(), addInitialGiftTransactions(), appendAct(), cancelTemporary(), cleanupExpiredTemporaries(), cleanupOldTransactions() (+34 more)
Community 126 - "Community 126"
Cohesion: 0.07 Nodes (37): AGENT_ICONS, getAgentIcon(), composite(), contrastRatio(), DARK_BG, hexToRgb(), isDarkMode(), LIGHT_BG (+29 more)
Community 127 - "Community 127"
Cohesion: 0.07 Nodes (31): ActorInput, commentSelect, documentAnnotationService(), IssueDocumentRow, threadSelect, documentService(), extractLegacyPlanBody(), issueDocumentSelect (+23 more)
Community 128 - "Community 128"
Cohesion: 0.13 Nodes (40): ACT_TYPES, addDAGEdge(), addDAGNode(), addInitialGiftTransactions(), appendAct(), cancelTemporary(), cleanupExpiredTemporaries(), cleanupOldTransactions() (+32 more)
Community 129 - "Community 129"
Cohesion: 0.08 Nodes (32): activeExternalOverrides, adapterChangeListeners, builtinAdaptersByType, builtinTypes, findUIAdapter(), getUIAdapter(), listUIAdapters(), notifyAdapterChange() (+24 more)
Community 130 - "Community 130"
Cohesion: 0.13 Nodes (40): ACT_TYPES, addDAGEdge(), addDAGNode(), addInitialGiftTransactions(), appendAct(), cancelTemporary(), cleanupExpiredTemporaries(), cleanupOldTransactions() (+32 more)
Community 131 - "Community 131"
Cohesion: 0.13 Nodes (40): ACT_TYPES, addDAGEdge(), addDAGNode(), addInitialGiftTransactions(), appendAct(), cancelTemporary(), cleanupExpiredTemporaries(), cleanupOldTransactions() (+32 more)
Community 132 - "Community 132"
Cohesion: 0.13 Nodes (40): ACT_TYPES, addDAGEdge(), addDAGNode(), addInitialGiftTransactions(), appendAct(), cancelTemporary(), cleanupExpiredTemporaries(), cleanupOldTransactions() (+32 more)
Community 133 - "Community 133"
Cohesion: 0.13 Nodes (40): ACT_TYPES, addDAGEdge(), addDAGNode(), addInitialGiftTransactions(), appendAct(), cancelTemporary(), cleanupExpiredTemporaries(), cleanupOldTransactions() (+32 more)
Community 134 - "Community 134"
Cohesion: 0.13 Nodes (40): ACT_TYPES, addDAGEdge(), addDAGNode(), addInitialGiftTransactions(), appendAct(), cancelTemporary(), cleanupExpiredTemporaries(), cleanupOldTransactions() (+32 more)
Community 135 - "Community 135"
Cohesion: 0.13 Nodes (40): ACT_TYPES, addDAGEdge(), addDAGNode(), addInitialGiftTransactions(), appendAct(), cancelTemporary(), cleanupExpiredTemporaries(), cleanupOldTransactions() (+32 more)
Community 136 - "Community 136"
Cohesion: 0.13 Nodes (40): ACT_TYPES, addDAGEdge(), addDAGNode(), addInitialGiftTransactions(), appendAct(), cancelTemporary(), cleanupExpiredTemporaries(), cleanupOldTransactions() (+32 more)
Community 137 - "Community 137"
Cohesion: 0.10 Nodes (39): addStatusEntries(), buildTrackedPatch(), buildUntrackedFilePatch(), buildUntrackedPatch(), collectFiles(), countAddedLines(), DiffScope, ensureFile() (+31 more)
Community 138 - "Community 138"
Cohesion: 0.09 Nodes (27): DEFAULT_ENDPOINTS, TelemetryClient, CI_ENV_VARS, isCI(), resolveTelemetryConfig(), trackAgentCreated(), trackAgentFirstHeartbeat(), trackAgentTaskCompleted() (+19 more)
Community 139 - "Community 139"
Cohesion: 0.07 Nodes (36): activationChecklistFromReport(), asRecord(), buildEntitiesFromPortableExport(), cloudUpstreamRemoteFailureReport(), cloudUpstreamRunStatus(), cloudUpstreamStep(), cloudUpstreamTokenStatus(), conflictsFromRemote() (+28 more)
Community 140 - "Community 140"
Cohesion: 0.09 Nodes (34): addAgentChainCandidates(), addOwnerCandidate(), BLOCKING_AGENT_STATUSES, classifyIssueGraphLiveness(), finding(), hasScheduledMonitor(), incidentKey(), INVOKABLE_AGENT_STATUSES (+26 more)
Community 141 - "Community 141"
Cohesion: 0.13 Nodes (40): ACT_TYPES, addDAGEdge(), addDAGNode(), addInitialGiftTransactions(), appendAct(), cancelTemporary(), cleanupExpiredTemporaries(), cleanupOldTransactions() (+32 more)
Community 142 - "Community 142"
Cohesion: 0.08 Nodes (33): RestoreRoutineRevisionResponse, AgentLookup, asSecretRef(), collectWebhookTriggerDifferences(), compareEnv(), compareTriggers(), computeFieldChanges(), ConflictBanner() (+25 more)
Community 143 - "Community 143"
Cohesion: 0.05 Nodes (34): AppState, clearBtn, closeTransactionsRegistry, closeUzRegistry, devPanelContent, devTimeButtons, devTimeStatus, getCorrectLength() (+26 more)
Community 144 - "Community 144"
Cohesion: 0.05 Nodes (34): AppState, clearBtn, closeTransactionsRegistry, closeUzRegistry, devPanelContent, devTimeButtons, devTimeStatus, getCorrectLength() (+26 more)
Community 145 - "Community 145"
Cohesion: 0.13 Nodes (39): ACT_TYPES, addDAGEdge(), addDAGNode(), appendAct(), cancelTemporary(), cleanupExpiredTemporaries(), cleanupOldTransactions(), confirmTemporary() (+31 more)
Community 146 - "Community 146"
Cohesion: 0.13 Nodes (39): ACT_TYPES, addDAGEdge(), addDAGNode(), appendAct(), cancelTemporary(), cleanupExpiredTemporaries(), cleanupOldTransactions(), confirmTemporary() (+31 more)
Community 147 - "Community 147"
Cohesion: 0.05 Nodes (33): PluginEnvironmentExecuteParams, PluginPerformActionActorContext, assertEnvironmentError(), assertEnvironmentEventOrder(), assertExecutionLifecycle(), assertLeaseLifecycle(), assertWorkspaceRealizationLifecycle(), createEnvironmentTestHarness() (+25 more)
Community 148 - "Community 148"
Cohesion: 0.07 Nodes (20): DEFAULT_CONFIG, EXPORT_NAMES, JOB_KEYS, RUNTIME_LAUNCHER, SAFE_COMMANDS, SafeCommandKey, SLOT_IDS, STREAM_CHANNELS (+12 more)
Community 149 - "Community 149"
Cohesion: 0.06 Nodes (29): assertRequestConfirmationTargetIsCurrent(), buildIssueDocumentTargetFromSnapshot(), expireStaleRequestConfirmationTarget(), getIssueDocumentTargetSnapshot(), hydrateInteraction(), InteractionActor, IssueResolutionContext, IssueThreadInteractionRow (+21 more)
Community 150 - "Community 150"
Cohesion: 0.09 Nodes (38): agentLinkRow(), AgentRow, buildFinishSuccessfulRunHandoffIdempotencyKey(), buildSuccessfulRunHandoffExhaustedNotice(), buildSuccessfulRunHandoffInstruction(), buildSuccessfulRunHandoffRequiredNotice(), decideSuccessfulRunHandoff(), findExistingFinishSuccessfulRunHandoffWake() (+30 more)
Community 151 - "Community 151"
Cohesion: 0.09 Nodes (37): calculateInvestorStatuses(), fixInitialGiftOK(), getCorrectLength(), init(), initAct1Tabs(), initCrossTransactionFramework(), initDailyPlanner(), initDepartmentsGrid() (+29 more)
Community 152 - "Community 152"
Cohesion: 0.06 Nodes (39): AgentRow, AssetRow, buildWorktreeMergePlan(), CommentMergeAction, CommentRow, compareIssueCoreFields(), DocumentRevisionRow, DocumentRevisionTableRow (+31 more)
Community 153 - "Community 153"
Cohesion: 0.07 Nodes (31): stabilizeThreadMessages(), agentMap, baseMs, cancelledMessages, comments, firstPass, firstStable, linkedRuns (+23 more)
Community 154 - "Community 154"
Cohesion: 0.09 Nodes (37): BackupRetentionPolicy, createBufferedTextFileWriter(), ExtensionDefinition, formatBackupSize(), formatDatabaseBackupResult(), formatPostgresArrayElement(), formatPostgresArrayLiteral(), formatSqlLiteral() (+29 more)
Community 155 - "Community 155"
Cohesion: 0.15 Nodes (37): ACT_TYPES, addDAGEdge(), addDAGNode(), appendAct(), cancelTemporary(), cleanupExpiredTemporaries(), confirmTemporary(), createTemporary() (+29 more)
Community 156 - "Community 156"
Cohesion: 0.15 Nodes (37): ACT_TYPES, addDAGEdge(), addDAGNode(), appendAct(), cancelTemporary(), cleanupExpiredTemporaries(), confirmTemporary(), createTemporary() (+29 more)
Community 157 - "Community 157"
Cohesion: 0.15 Nodes (37): ACT_TYPES, addDAGEdge(), addDAGNode(), appendAct(), cancelTemporary(), cleanupExpiredTemporaries(), confirmTemporary(), createTemporary() (+29 more)
Community 158 - "Community 158"
Cohesion: 0.15 Nodes (37): ACT_TYPES, addDAGEdge(), addDAGNode(), appendAct(), cancelTemporary(), cleanupExpiredTemporaries(), confirmTemporary(), createTemporary() (+29 more)
Community 159 - "Community 159"
Cohesion: 0.11 Nodes (35): authorNameForComment(), buildAssistantPartsFromTranscript(), buildIssueChatMessages(), compactIssueChatTranscript(), computeSegmentTimings(), createAssistantMetadata(), createCommentMessage(), createHistoricalRunMessage() (+27 more)
Community 160 - "Community 160"
Cohesion: 0.08 Nodes (37): applyLocalQueuedIssueCommentState(), applyOptimisticIssueCommentUpdate(), applyOptimisticIssueFieldUpdate(), applyOptimisticIssueFieldUpdateToCollection(), createOptimisticCommentId(), createOptimisticIssueComment(), flattenIssueCommentPages(), getNextIssueCommentPageParam() (+29 more)
Community 161 - "Community 161"
Cohesion: 0.10 Nodes (36): buildCreateCommand(), buildEnvFlags(), buildFlag(), buildLease(), buildRepeatedFlag(), buildSshArgs(), buildSshDestination(), buildVmName() (+28 more)
Community 162 - "Community 162"
Cohesion: 0.09 Nodes (34): AgentInstructionsBundle, AgentInstructionsFileDetail, AgentInstructionsFileSummary, agentInstructionsService(), AgentLike, applyBundleConfig(), asRecord(), asString() (+26 more)
Community 163 - "Community 163"
Cohesion: 0.11 Nodes (39): archiveSpace(), bootstrapSpace(), createOperationIssue(), createPaperclipDistillationWorkItem(), distillationCursorTable(), distillationRunTable(), distillationWorkItemTable(), enableActiveProjectDistillation() (+31 more)
Community 164 - "Community 164"
Cohesion: 0.10 Nodes (36): applyPendingMigrationsManually(), columnExists(), constraintExists(), createDb(), Db, ensureMigrationJournalTable(), getMigrationTableColumnNames(), indexExists() (+28 more)
Community 165 - "Community 165"
Cohesion: 0.06 Nodes (14): manifest, looksLikePath(), plugin, sanitizeWorkspacePath(), SmokeInput, SmokeSummary, action, agentId (+6 more)
Community 166 - "Community 166"
Cohesion: 0.06 Nodes (36): PluginModalBoundsRequest, PluginRenderCloseEvent, useHostContext(), useHostLocation(), useHostNavigation(), usePluginAction(), usePluginData(), usePluginStream() (+28 more)
Community 167 - "Community 167"
Cohesion: 0.10 Nodes (35): avatarGridHeight(), avatarGridRows(), avatarGridWidth(), cardHeight(), cardWidth(), collapseToAvatars(), countNodes(), defaultRenderCard() (+27 more)
Community 168 - "Community 168"
Cohesion: 0.11 Nodes (26): asRecord(), compactWhitespace(), displayToolName(), extractToolUseId(), formatToolPayload(), formatUnknown(), groupCommandBlocks(), groupToolBlocks() (+18 more)
Community 169 - "Community 169"
Cohesion: 0.16 Nodes (16): LocalWorkspaceRuntimeFields(), AdapterConfigFieldsProps, StatefulStdoutParser, ClaudeLocalAdvancedFields(), CollapsibleSection(), DraftInput(), DraftNumberInput(), Field() (+8 more)
Community 170 - "Community 170"
Cohesion: 0.05 Nodes (26): DISTILLATION_CURSOR, DISTILLATION_OVERVIEW, DISTILLATION_OVERVIEW_UNCONFIGURED, DISTILLATION_PAGE_BINDINGS, DISTILLATION_PROVENANCE, DISTILLATION_RUNS, FOLDER_HEALTHY, HOST_CONTEXT (+18 more)
Community 171 - "Community 171"
Cohesion: 0.08 Nodes (22): AppState, buildCanonicalRecord(), closeAllModals(), colorizeOK(), DOMAIN_MAP, formatTransactionRecord(), generateDisputeCode(), getCorrectLength() (+14 more)
Community 172 - "Community 172"
Cohesion: 0.08 Nodes (22): AppState, buildCanonicalRecord(), closeAllModals(), colorizeOK(), DOMAIN_MAP, formatTransactionRecord(), generateDisputeCode(), getCorrectLength() (+14 more)
Community 173 - "Community 173"
Cohesion: 0.08 Nodes (34): ToastInput, hasCompanyPrefix(), HostLocation, HostNavigation, HostNavigationLinkOptions, HostNavigationLinkProps, HostNavigationOptions, isPlainLeftClick() (+26 more)
Community 174 - "Community 174"
Cohesion: 0.08 Nodes (26): issueChatUxAgentMap, issueChatUxFeedbackVotes, issueChatUxLinkedRuns, issueChatUxLiveComments, issueChatUxLiveEvents, issueChatUxLiveRuns, issueChatUxMentions, issueChatUxReassignOptions (+18 more)
Community 175 - "Community 175"
Cohesion: 0.09 Nodes (31): base64ToBytes(), binaryContentTypeByExtension, bytesToBase64(), bytesToPortableFileEntry(), concatChunks(), crc32(), crcTable, createZipArchive() (+23 more)
Community 176 - "Community 176"
Cohesion: 0.08 Nodes (29): ACTIVATION_CATEGORIES, ActivationChecklist(), basePreview(), buildActivationRows(), buildFixture(), cleanPreview(), CloudUpstreamRender(), CloudUpstreamUxLab() (+21 more)
Community 177 - "Community 177"
Cohesion: 0.10 Nodes (31): BridgeClientHeaders, BridgeClientOptions, BridgeErrorBody, BridgeExecuteOptions, buildHeaders(), CloudflareBridgeError, consumeExecuteEventStream(), createCloudflareBridgeClient() (+23 more)
Community 178 - "Community 178"
Cohesion: 0.09 Nodes (26): cloneRecord(), isRecord(), mergeProjectWorkspaceRuntimeConfig(), readDesiredState(), readProjectWorkspaceRuntimeConfig(), readServiceStates(), CreateWorkspaceInput, deriveNameFromCwd() (+18 more)
Community 179 - "Community 179"
Cohesion: 0.11 Nodes (32): actionabilityText(), classifyRunActionability(), classifyRunLiveness(), combinedOutput(), declaredBlocker(), DEFAULT_EVIDENCE, evidenceReason(), extractNextAction() (+24 more)
Community 180 - "Community 180"
Cohesion: 0.06 Nodes (30): agentContext, bundle, claudeRoot, commentId, companyId, filePaths, firstTrace, flushingSvc (+22 more)
Community 181 - "Community 181"
Cohesion: 0.11 Nodes (29): AuthLoginOptions, AuthLogoutOptions, AuthWhoamiOptions, registerClientAuthCommands(), BoardAuthCredential, BoardAuthStore, ChallengeStatusResponse, CreateChallengeResponse (+21 more)
Community 182 - "Community 182"
Cohesion: 0.11 Nodes (29): collectDeploymentEnvRows(), defaultSecretsKeyFilePath(), defaultStorageBaseDir(), envCommand(), EnvSource, EnvVarRow, uniqueByKey(), ensureAgentJwtSecret() (+21 more)
Community 183 - "Community 183"
Cohesion: 0.11 Nodes (35): branchExistsOnAnyRemote(), branchHasUniqueCommits(), copyDirectoryContents(), copyGitHooksToWorktreeGitDir(), detectGitBranchName(), detectGitWorkspaceInfo(), ensureRepairTargetWorktree(), extractExecSyncErrorMessage() (+27 more)
Community 184 - "Community 184"
Cohesion: 0.06 Nodes (28): act(), agentMap, anchor, chip, composer, cta, directRequestButton, doc (+20 more)
Community 185 - "Community 185"
Cohesion: 0.07 Nodes (33): act(), bodyScrollRegion, companyState, description, descriptionInput, dialogContent, dialogContentState, dialogState (+25 more)
Community 186 - "Community 186"
Cohesion: 0.07 Nodes (20): AppState, closeAllModals(), DOMAIN_MAP, generateDisputeCode(), hasEmittedThisPeriod(), initDepartmentsGrid(), isNewPeriodSince(), isTriadAvailable() (+12 more)
Community 187 - "Community 187"
Cohesion: 0.06 Nodes (29): computeMentionMenuPosition(), findClosestAutocompleteAnchor(), isSameAutocompleteSession(), placeCaretAfterMentionAnchor(), shouldAcceptAutocompleteKey(), editable, flush(), found (+21 more)
Community 188 - "Community 188"
Cohesion: 0.07 Nodes (24): buildIssueSiblingNavigation(), buildSubIssueProgressSummary(), IssueSiblingNavigation, shouldRenderRichSubIssuesSection(), shouldRenderSubIssueProgressSummary(), SubIssueProgressSummary, SubIssueProgressTarget, SubIssueProgressTargetKind (+16 more)
Community 189 - "Community 189"
Cohesion: 0.07 Nodes (29): baseAcquireParams, baseConfig, baseConfigWithTokens, [command], [command, cwdArg, envArg, timeoutArg], constructor(), createMockSandbox(), ephemeral (+21 more)
Community 190 - "Community 190"
Cohesion: 0.12 Nodes (30): CWD_ENV_PATH, DatabaseMode, detectTailnetBindHost(), readConfigFile(), loadConfig(), PAPERCLIP_ENV_FILE_PATH, resolveDefaultConfigPath(), findConfigFileFromAncestors() (+22 more)
Community 191 - "Community 191"
Cohesion: 0.11 Nodes (30): readBrandedStaticIndexHtml(), applyUiBranding(), createFaviconDataUrl(), DEFAULT_FAVICON_LINKS, deriveColorFromSeed(), escapeHtmlAttribute(), getWorktreeUiBranding(), hexToRgb() (+22 more)
Community 192 - "Community 192"
Cohesion: 0.09 Nodes (26): formatTimestamp(), SystemNotice(), SystemNoticeMetadataRow, SystemNoticeMetadataSection, SystemNoticeProps, SystemNoticeTone, button, links (+18 more)
Community 193 - "Community 193"
Cohesion: 0.09 Nodes (27): ShortcutHandlers, event, input, onNewIssue, onSearch, root, useKeyboardShortcuts(), findPageSearchShortcutTarget() (+19 more)
Community 194 - "Community 194"
Cohesion: 0.06 Nodes (28): after, before, binDir, capture, capture1, capture2, captured, capturedNotes (+20 more)
Community 195 - "Community 195"
Cohesion: 0.09 Nodes (24): healthApi, HealthStatus, BAYER_4X4, CompanyPatternIconProps, hashString(), hexToHue(), hslToRgb(), makeCompanyPatternDataUrl() (+16 more)
Community 196 - "Community 196"
Cohesion: 0.08 Nodes (28): ClosableDb, closeDb(), disableAllRoutinesCommand(), disableAllRoutinesInConfig(), DisableAllRoutinesResult, EmbeddedPostgresCtor, EmbeddedPostgresHandle, EmbeddedPostgresInstance (+20 more)
Community 197 - "Community 197"
Cohesion: 0.08 Nodes (28): AgentSkillsTab(), ACPX_TS_BASE, AcpxClaudeSkillsEmptyLibraryStory(), AcpxClaudeSkillsLoadingStory(), AcpxClaudeSkillsStory(), AcpxCodexSkillsStory(), AcpxCustomSkillsStory(), acpxLocalConfigSchema (+20 more)
Community 198 - "Community 198"
Cohesion: 0.06 Nodes (18): codexHome, compatibleParams, context, execute, FakeRuntime, firstExecute, LogEntry, logs (+10 more)
Community 199 - "Community 199"
Cohesion: 0.06 Nodes (28): binDir, capture, capturePath, CapturePayload, commandNotes, commandPath, executorCapture, executorCapturePath (+20 more)
Community 200 - "Community 200"
Cohesion: 0.14 Nodes (25): addDAGNode(), AppState, calculateWeight(), checkBurn(), emitUE(), generateTxId(), getBurnTime(), getTimeUntilMidnight() (+17 more)
Community 201 - "Community 201"
Cohesion: 0.14 Nodes (25): addDAGNode(), AppState, calculateWeight(), checkBurn(), emitUE(), generateTxId(), getBurnTime(), getTimeUntilMidnight() (+17 more)
Community 202 - "Community 202"
Cohesion: 0.11 Nodes (20): ApiClientOptions, ApiConnectionError, ApiRequestError, buildConnectionErrorMessage(), buildHealthCheckUrl(), buildUrl(), formatConnectionCause(), PaperclipApiClient (+12 more)
Community 203 - "Community 203"
Cohesion: 0.07 Nodes (27): addCommentToolSchema, agentIdOptional, apiRequestSchema, approvalDecisionSchema, approvalIdSchema, checkoutIssueToolSchema, companyIdOptional, createApprovalToolSchema (+19 more)
Community 204 - "Community 204"
Cohesion: 0.08 Nodes (28): WorkspaceDiffFilePatch, WorkspaceDiffWarning, buildFilePatch(), buildFilePatches(), DiffFileViewModel, DiffPatchViewModel, DiffRenderMode, diffSummary() (+20 more)
Community 205 - "Community 205"
Cohesion: 0.08 Nodes (24): CapabilityDeniedError, createHostClientHandlers(), getRequiredCapability(), HostClientFactoryOptions, HostClientHandlers, HostHandler, HostServices, InvocationScopeDeniedError (+16 more)
Community 206 - "Community 206"
Cohesion: 0.06 Nodes (29): accessSvc, agentInstructionsSvc, agentResult, agentSvc, assetSvc, catalogSkill, companySkills, companySkillSvc (+21 more)
Community 207 - "Community 207"
Cohesion: 0.08 Nodes (29): BrowseTab(), contentPathFromTreePath(), CreateSpaceModal(), firstSelectableTreePath(), formatTimestamp(), FreshnessChip(), HistoryTab(), IngestFilesModal() (+21 more)
Community 208 - "Community 208"
Cohesion: 0.09 Nodes (20): html, buttonClass(), ChangesTab(), clampFileSidebarWidth(), CollapsedFilePanel(), DiffViewMode, ErrorState(), FileDiffPanel() (+12 more)
Community 209 - "Community 209"
Cohesion: 0.07 Nodes (23): issue, metadata, mockAccessService, mockAgentService, mockDb, mockDbSelect, mockDbSelectFrom, mockDbSelectOrderBy (+15 more)
Community 210 - "Community 210"
Cohesion: 0.11 Nodes (30): activateImpulseUE(), calculateBurnAt(), calculateSpiritualDynamics(), calculateWeight(), closeTransferConfirmModal(), confirmTransfer(), emitUE(), filterByNormRule() (+22 more)
Community 211 - "Community 211"
Cohesion: 0.09 Nodes (17): AppState, closeAllModals(), DOMAIN_MAP, filterByNormRule(), getAlreadySentTo(), hasEmittedThisPeriod(), isNewPeriodSince(), isSelfGratitude() (+9 more)
Community 212 - "Community 212"
Cohesion: 0.16 Nodes (27): BASE_COLORS, CHAR_COLORS, confirmBtn, confirmOK(), copyBtn, copyFeedback, getCharColor(), getCorrectLength() (+19 more)
Community 213 - "Community 213"
Cohesion: 0.12 Nodes (23): atMinute(), baseTime, createComment(), issueChatLongThreadAgentMap, issueChatLongThreadComments, issueChatLongThreadEvents, issueChatLongThreadFixtureContext, issueChatLongThreadLinkedRuns (+15 more)
Community 214 - "Community 214"
Cohesion: 0.12 Nodes (26): ACTIVITY_ROW_VERBS, ActivityDetails, ActivityFormatOptions, ActivityIssueReference, ActivityParticipant, asRecord(), formatAcceptedPlanDecompositionDetail(), formatActivityVerb() (+18 more)
Community 215 - "Community 215"
Cohesion: 0.10 Nodes (23): normalizePortablePath(), CatalogManifestFile, catalogManifestPath, catalogPackageRoot, copyCatalogSkillFile(), getCatalogManifest(), getCatalogPackageMetadata(), getCatalogSkillOrThrow() (+15 more)
Community 216 - "Community 216"
Cohesion: 0.07 Nodes (26): allowed, approvedAgent, baseAgent, createApp(), createDbStub(), mockAccessService, mockAgentInstructionsService, mockAgentService (+18 more)
Community 217 - "Community 217"
Cohesion: 0.09 Nodes (28): AppState, canTransferUE(), checkBurn(), closeAllModals(), closeOKListModal(), DOMAIN_MAP, escapeHtml(), getLastActsForDomain() (+20 more)
Community 218 - "Community 218"
Cohesion: 0.10 Nodes (22): BASE_COLORS, CHAR_COLORS, confirmBtn, confirmOK(), copyBtn, copyFeedback, getCharColor(), getCorrectLength() (+14 more)
Community 219 - "Community 219"
Cohesion: 0.10 Nodes (22): BASE_COLORS, CHAR_COLORS, confirmBtn, confirmOK(), copyBtn, copyFeedback, getCharColor(), getCorrectLength() (+14 more)
Community 220 - "Community 220"
Cohesion: 0.10 Nodes (22): BASE_COLORS, CHAR_COLORS, confirmBtn, confirmOK(), copyBtn, copyFeedback, getCharColor(), getCorrectLength() (+14 more)
Community 221 - "Community 221"
Cohesion: 0.10 Nodes (22): BASE_COLORS, CHAR_COLORS, confirmBtn, confirmOK(), copyBtn, copyFeedback, getCharColor(), getCorrectLength() (+14 more)
Community 222 - "Community 222"
Cohesion: 0.07 Nodes (20): parseWorktreeMergeScopes(), attachment, branchOneIssue, branchTwoIssue, existingComment, insert, mergePlan, newIssue (+12 more)
Community 223 - "Community 223"
Cohesion: 0.08 Nodes (17): node, pre, wrapButton, html, mockIssuesApi, actions, pre, wrapButton (+9 more)
Community 224 - "Community 224"
Cohesion: 0.11 Nodes (24): SourceResolvedFoldBadge(), SourceResolvedFoldBadgeProps, asBoolean(), asFiniteNumber(), asRecord(), asString(), CLEANUP_OUTCOME_LABELS, formatCleanupOutcome() (+16 more)
Community 225 - "Community 225"
Cohesion: 0.16 Nodes (24): createDevServiceIdentity(), repoRoot, createLocalServiceKey(), execFileAsync, findAdoptableLocalService(), findLocalServiceRegistryRecordByRuntimeServiceId(), getRuntimeServiceRegistryPath(), getRuntimeServicesDir() (+16 more)
Community 226 - "Community 226"
Cohesion: 0.09 Nodes (20): awsSecretsManagerProvider, gcpSecretManagerProvider, vaultProvider, localEncryptedProvider, getSecretProvider(), providerById, providers, PreparedSecretVersion (+12 more)
Community 227 - "Community 227"
Cohesion: 0.08 Nodes (22): blankLatestDocument, createIssue(), createIssueDocument(), currentDocument, currentRevisionButton, document, heading, historicalRevisionButton (+14 more)
Community 228 - "Community 228"
Cohesion: 0.12 Nodes (19): createEmbeddedPostgresLogBuffer(), detectEmbeddedPostgresHint(), formatEmbeddedPostgresError(), summarizeRecentLogs(), buffer, error, toError(), EmbeddedPostgresCtor (+11 more)
Community 229 - "Community 229"
Cohesion: 0.27 Nodes (9): agentWakeupRequests, agents, environmentLeases, environments, heartbeatRuns, issueComments, issueThreadInteractions, issueTreeHolds (+1 more)
Community 230 - "Community 230"
Cohesion: 0.11 Nodes (22): additionalSerializedServerTests, fail(), generalGroupNames, generalWorkspacesAProjects, generalWorkspacesBProjects, nonServerProjects, options, parseCliOptions() (+14 more)
Community 231 - "Community 231"
Cohesion: 0.09 Nodes (24): assertAuthenticated(), assertBoard(), assertCompanyAccess(), assertInstanceAdmin(), baseAgent, baseKey, createApp(), crossTenantActor (+16 more)
Community 232 - "Community 232"
Cohesion: 0.11 Nodes (20): BASE_COLORS, CHAR_COLORS, confirmBtn, confirmOK(), copyBtn, copyFeedback, getCharColor(), getCorrectLength() (+12 more)
Community 233 - "Community 233"
Cohesion: 0.11 Nodes (20): BASE_COLORS, CHAR_COLORS, confirmBtn, confirmOK(), copyBtn, copyFeedback, getCharColor(), getCorrectLength() (+12 more)
Community 234 - "Community 234"
Cohesion: 0.11 Nodes (20): BASE_COLORS, CHAR_COLORS, confirmBtn, confirmOK(), copyBtn, copyFeedback, getCharColor(), getCorrectLength() (+12 more)
Community 235 - "Community 235"
Cohesion: 0.11 Nodes (20): BASE_COLORS, CHAR_COLORS, confirmBtn, confirmOK(), copyBtn, copyFeedback, getCharColor(), getCorrectLength() (+12 more)
Community 236 - "Community 236"
Cohesion: 0.11 Nodes (20): BASE_COLORS, CHAR_COLORS, confirmBtn, confirmOK(), copyBtn, copyFeedback, getCharColor(), getCorrectLength() (+12 more)
Community 237 - "Community 237"
Cohesion: 0.11 Nodes (20): BASE_COLORS, CHAR_COLORS, confirmBtn, confirmOK(), copyBtn, copyFeedback, getCharColor(), getCorrectLength() (+12 more)
Community 238 - "Community 238"
Cohesion: 0.10 Nodes (23): act(), betaPauseItem, browseLink, budgetPausedItem, chooseSortMode(), editLink, flushReact(), leaveItem (+15 more)
Community 239 - "Community 239"
Cohesion: 0.10 Nodes (18): buildJobItem(), buildServiceItem(), buildWorkspaceRuntimeControlItems(), buildWorkspaceRuntimeControlSections(), getRunningRuntimeServiceUrl(), LegacyWorkspaceRuntimeControlItem, buttons, items (+10 more)
Community 240 - "Community 240"
Cohesion: 0.10 Nodes (22): queryBooleanSchema, WorkspaceDiffCaps, workspaceDiffCapsSchema, WorkspaceDiffFile, workspaceDiffFilePatchSchema, workspaceDiffFileSchema, WorkspaceDiffFileStatus, workspaceDiffFileStatusSchema (+14 more)
Community 241 - "Community 241"
Cohesion: 0.16 Nodes (24): buildAgentMentionHref(), buildProjectMentionHref(), buildRoutineMentionHref(), buildSkillMentionHref(), buildUserMentionHref(), extractAgentMentionIds(), extractProjectMentionIds(), extractRoutineMentionIds() (+16 more)
Community 242 - "Community 242"
Cohesion: 0.14 Nodes (25): ActorLike, actorPrincipal(), applyIssueExecutionPolicyTransition(), applyIssueExecutionStageTransition(), AssigneeLike, assigneePrincipal(), buildChangesRequestedState(), buildCompletedState() (+17 more)
Community 243 - "Community 243"
Cohesion: 0.11 Nodes (20): BASE_COLORS, CHAR_COLORS, confirmBtn, confirmOK(), copyBtn, copyFeedback, getCharColor(), getCorrectLength() (+12 more)
Community 244 - "Community 244"
Cohesion: 0.13 Nodes (26): calculateBurnAt(), calculateSpiritualDynamics(), calculateWeight(), canTransferBySystem(), closeTransferConfirmModal(), confirmTransfer(), emitUE(), generateTxId() (+18 more)
Community 245 - "Community 245"
Cohesion: 0.13 Nodes (26): calculateBurnAt(), calculateSpiritualDynamics(), calculateWeight(), canTransferBySystem(), closeTransferConfirmModal(), confirmTransfer(), emitUE(), generateTxId() (+18 more)
Community 246 - "Community 246"
Cohesion: 0.10 Nodes (15): drainPendingRequests(), dynamicParserCache, DynamicParserModule, failedLoads, invalidateDynamicParser(), loadDynamicParser(), loadPromises, SandboxedParser (+7 more)
Community 247 - "Community 247"
Cohesion: 0.11 Nodes (24): CompanyUserDirectoryResponse, AGENT_TOAST_STATUSES, buildAgentStatusToast(), closeSocketQuietly(), gatedPushToast(), isPageForegrounded(), ISSUE_DOCUMENT_ACTIVITY_ACTIONS, ISSUE_TOAST_ACTIONS (+16 more)
Community 248 - "Community 248"
Cohesion: 0.11 Nodes (20): CHAR_COLORS, confirmBtn, confirmOK(), copyBtn, copyFeedback, getCharColor(), getCorrectLength(), handleDrop() (+12 more)
Community 249 - "Community 249"
Cohesion: 0.11 Nodes (20): CHAR_COLORS, confirmBtn, confirmOK(), copyBtn, copyFeedback, getCharColor(), getCorrectLength(), handleDrop() (+12 more)
Community 250 - "Community 250"
Cohesion: 0.11 Nodes (20): CHAR_COLORS, confirmBtn, confirmOK(), copyBtn, copyFeedback, getCharColor(), getCorrectLength(), handleDrop() (+12 more)
Community 251 - "Community 251"
Cohesion: 0.11 Nodes (20): CHAR_COLORS, confirmBtn, confirmOK(), copyBtn, copyFeedback, getCharColor(), getCorrectLength(), handleDrop() (+12 more)
Community 252 - "Community 252"
Cohesion: 0.11 Nodes (20): CHAR_COLORS, confirmBtn, confirmOK(), copyBtn, copyFeedback, getCharColor(), getCorrectLength(), handleDrop() (+12 more)
Community 253 - "Community 253"
Cohesion: 0.11 Nodes (20): CHAR_COLORS, confirmBtn, confirmOK(), copyBtn, copyFeedback, getCharColor(), getCorrectLength(), handleDrop() (+12 more)
Community 254 - "Community 254"
Cohesion: 0.11 Nodes (20): CHAR_COLORS, confirmBtn, confirmOK(), copyBtn, copyFeedback, getCharColor(), getCorrectLength(), handleDrop() (+12 more)
Community 255 - "Community 255"
Cohesion: 0.11 Nodes (20): CHAR_COLORS, confirmBtn, confirmOK(), copyBtn, copyFeedback, getCharColor(), getCorrectLength(), handleDrop() (+12 more)
Community 256 - "Community 256"
Cohesion: 0.11 Nodes (20): CHAR_COLORS, confirmBtn, confirmOK(), copyBtn, copyFeedback, getCharColor(), getCorrectLength(), handleDrop() (+12 more)
Community 257 - "Community 257"
Cohesion: 0.09 Nodes (22): buildIssueTree(), countDescendants(), filterIssueDescendants(), IssueTree, c1, c2, child, child1 (+14 more)
Community 258 - "Community 258"
Cohesion: 0.14 Nodes (18): asString(), buildCodexSkillSnapshot(), buildGeminiSkillSnapshot(), buildOpenCodeSkillSnapshot(), buildPiSkillSnapshot(), listCodexSkills(), listGeminiSkills(), listOpenCodeSkills() (+10 more)
Community 259 - "Community 259"
Cohesion: 0.09 Nodes (14): main(), parseFlag(), issueReferenceService(), SOURCE_KIND_ORDER, commentId, companyId, documentId, inboundIssueId (+6 more)
Community 260 - "Community 260"
Cohesion: 0.19 Nodes (23): collectInternalDependencyProblemEntries(), collectInternalDependencyProblems(), collectInternalDependencyVersions(), createExitError(), createManifestLookupKey(), createProblem(), createRegistryUrl(), fetchPackageDocument() (+15 more)
Community 261 - "Community 261"
Cohesion: 0.14 Nodes (23): buildJoinDefaultsPayloadForAccept(), canReplayOpenClawGatewayInviteAccept(), extractHeaderEntries(), generateEd25519PrivateKeyPem(), hashToken(), headerMapGetIgnoreCase(), headerMapHasKeyIgnoreCase(), isPlainObject() (+15 more)
Community 262 - "Community 262"
Cohesion: 0.12 Nodes (21): act(), browseLink, chooseSortMode(), curatedOrder, flushReact(), leaveItem, mockAuthApi, mockOpenNewProject (+13 more)
Community 263 - "Community 263"
Cohesion: 0.11 Nodes (18): BASE_COLORS, CHAR_COLORS, confirmBtn, copyBtn, feedback, getCorrectLength(), handleConfirmOK(), handleDrop() (+10 more)
Community 264 - "Community 264"
Cohesion: 0.16 Nodes (20): i18nextOptions, t(), assertValidLocaleMessages(), formatPath(), hasBlockedData(), hasEventHandlerAttribute(), hasRawHtml(), interpolationPlaceholders() (+12 more)
Community 265 - "Community 265"
Cohesion: 0.13 Nodes (16): collectIssueRefs(), fetchIssueDetail(), getCachedIssueDetail(), getIssueDetailCacheRefs(), getIssueDetailQueryOptions(), isNonEmptyString(), ISSUE_DETAIL_QUERY_PREFIX, mergeIssueSnapshots() (+8 more)
Community 266 - "Community 266"
Cohesion: 0.20 Nodes (22): asRecord(), compactWhitespace(), describeToolInput(), displayToolName(), formatToolPayload(), formatUnknown(), humanizeLabel(), isCommandTool() (+14 more)
Community 267 - "Community 267"
Cohesion: 0.13 Nodes (20): acquireDirectoryMergeLock(), captureDirectorySnapshot(), directoryEntryMatchesBaseline(), DirectorySnapshot, entriesMatch(), hashFile(), isHolderAlive(), mergeDirectoryWithBaseline() (+12 more)
Community 268 - "Community 268"
Cohesion: 0.08 Nodes (20): backupDir, backupFile, cleanup, cleanups, counts, createdAt, lines, migrationRows (+12 more)
Community 269 - "Community 269"
Cohesion: 0.18 Nodes (22): RunDatabaseRestoreOptions, applyPendingMigrations(), createUtilitySql(), discoverMigrationTableSchema(), ensurePostgresDatabase(), getPostgresDataDirectory(), inspectMigrations(), migratePostgresIfEmpty() (+14 more)
Community 270 - "Community 270"
Cohesion: 0.12 Nodes (20): asPositiveInt(), findConfigFileFromAncestors(), migrateLegacyConfig(), parseEnvFile(), PartialConfig, readConfig(), readEnvEntries(), resolveDatabaseTarget() (+12 more)
Community 271 - "Community 271"
Cohesion: 0.15 Nodes (21): buildCatalogManifest(), BuildCatalogManifestOptions, BuildCatalogManifestResult, buildCatalogSkill(), buildContentHash(), CATALOG_KINDS, collectCandidateUniquenessErrors(), collectDuplicateErrors() (+13 more)
Community 272 - "Community 272"
Cohesion: 0.11 Nodes (21): collectScannableFiles(), DEFAULT_SCAN_ROOTS, findGitPushOffenses(), GIT_PUSH_PATTERNS, lineMatchesGitPush(), repoRoot, runCheck(), SCANNABLE_EXTENSIONS (+13 more)
Community 273 - "Community 273"
Cohesion: 0.08 Nodes (18): approvalInput, db, mockAccessService, mockAdapter, mockAgentInstructionsService, mockAgentService, mockApprovalService, mockBudgetService (+10 more)
Community 274 - "Community 274"
Cohesion: 0.08 Nodes (21): blockedIssueId, blockerExecutionWorkspaceId, blockerIssueId, blockerProjectId, blockerProjectWorkspaceId, closedEscalationId, companyId, createdEvent (+13 more)
Community 275 - "Community 275"
Cohesion: 0.13 Nodes (24): addWeeklyEvent(), createCouncil(), createUnion(), deleteCouncil(), deleteUnion(), editCouncil(), editUnion(), getCurrentOK() (+16 more)
Community 276 - "Community 276"
Cohesion: 0.12 Nodes (24): appendBoundedSection(), appendProjectLogContents(), assemblePaperclipSourceBundle(), assertPaperclipSourceScopePayload(), autoApplyEnabled(), countPaperclipHistoricalPages(), createPaperclipDistillationRun(), decisionsPageContents() (+16 more)
Community 277 - "Community 277"
Cohesion: 0.09 Nodes (18): app, burnAt, burnedUEs, cors, createdUEs, cron, emissionPayload, express (+10 more)
Community 278 - "Community 278"
Cohesion: 0.19 Nodes (19): ClientContext, ClientContextProfile, ContextOptions, ContextSetOptions, defaultClientContext(), findContextFileFromAncestors(), normalizeContext(), normalizeProfile() (+11 more)
Community 279 - "Community 279"
Cohesion: 0.09 Nodes (20): BlockedInboxIssueRow, blockedReasonLabel(), blockedRowMatchesSearch(), buildBlockedInboxRows(), groupBlockedInboxRows(), sortBlockedInboxRows(), a, b (+12 more)
Community 280 - "Community 280"
Cohesion: 0.11 Nodes (19): boardMutationGuard(), DEFAULT_DEV_ORIGINS, isTrustedBoardMutationRequest(), parseOrigin(), SAFE_METHODS, trustedOriginsForRequest(), app, middleware (+11 more)
Community 281 - "Community 281"
Cohesion: 0.09 Nodes (17): enabledDetailTabFilters, mockAgentsApi, mockExecutionWorkspacesApi, mockHeartbeatsApi, mockIssuesApi, mockNavigate, mockPluginSlotMount, mockPluginSlotOutlet (+9 more)
Community 282 - "Community 282"
Cohesion: 0.21 Nodes (11): costEvents, executionWorkspaces, financeEvents, goals, issueWorkProducts, projectGoals, projectMemberships, projectWorkspaces (+3 more)
Community 283 - "Community 283"
Cohesion: 0.10 Nodes (14): editorBaseTheme, editorDarkHighlightStyle, editorDarkTheme, editorLightHighlightStyle, editorLightTheme, FileEntry, FilesTab(), isLikelyPath() (+6 more)
Community 284 - "Community 284"
Cohesion: 0.09 Nodes (21): { config, changed }, configPath, currentInstanceRoot, currentWorktreeRoot, envPath, instanceRoot, isolatedHome, ORIGINAL_CWD (+13 more)
Community 285 - "Community 285"
Cohesion: 0.15 Nodes (23): calculateBurnAt(), calculateSpiritualDynamics(), calculateWeight(), canTransferBySystem(), closeTransferConfirmModal(), confirmTransfer(), emitUE(), generateTxId() (+15 more)
Community 286 - "Community 286"
Cohesion: 0.15 Nodes (23): calculateBurnAt(), calculateSpiritualDynamics(), calculateWeight(), canTransferBySystem(), closeTransferConfirmModal(), confirmTransfer(), emitUE(), generateTxId() (+15 more)
Community 287 - "Community 287"
Cohesion: 0.13 Nodes (23): agentDetails(), agentResource(), bindingTable(), bootstrapWikiRoot(), getOverview(), getResourceBinding(), parseBindingMetadata(), projectDetails() (+15 more)
Community 288 - "Community 288"
Cohesion: 0.14 Nodes (23): assertRequestedCharacterLimit(), countPaperclipProfileOverlaps(), defaultPaperclipIngestionProfile(), evaluatePaperclipProfilePolicy(), eventIngestionDedupKey(), eventIngestionStateKey(), getEventIngestionSettings(), getPaperclipIngestionProfile() (+15 more)
Community 289 - "Community 289"
Cohesion: 0.11 Nodes (16): acpxLocalCLIAdapter, adaptersByType, claudeLocalCLIAdapter, codexLocalCLIAdapter, cursorCloudCLIAdapter, cursorLocalCLIAdapter, geminiLocalCLIAdapter, getCLIAdapter() (+8 more)
Community 290 - "Community 290"
Cohesion: 0.14 Nodes (19): appendParsedTranscriptLine(), appendTranscriptEntries(), appendTranscriptEntry(), buildTranscript(), createTranscriptParseErrorEntry(), formatTranscriptParserError(), RedactionOptions, resolveStdoutParser() (+11 more)
Community 291 - "Community 291"
Cohesion: 0.09 Nodes (17): CompanyJoinRequest, apiMocks, button, caret, issueA, issueB, link, liveBadge (+9 more)
Community 292 - "Community 292"
Cohesion: 0.10 Nodes (9): BootstrapPendingPage(), BootstrapPendingPageProps, claimErrorCopy(), displayIdentity(), BootstrapSetupUxLab(), FIXTURE_BODIES, FIXTURE_LABELS, FIXTURE_ORDER (+1 more)
Community 293 - "Community 293"
Cohesion: 0.12 Nodes (20): AnnotationLayerProps, AnnotationOverlayThread, clearNativeHighlightRanges(), clipsOverflow(), CssHighlight, DocumentAnnotationLayer(), elementFromNode(), getNativeHighlightApi() (+12 more)
Community 294 - "Community 294"
Cohesion: 0.26 Nodes (22): buildActivityToast(), buildIssueRefsForPayload(), buildJoinRequestToast(), buildRunStatusToast(), describeIssueUpdate(), handleLiveEvent(), hydrateVisibleIssueComment(), invalidateActivityQueries() (+14 more)
Community 295 - "Community 295"
Cohesion: 0.10 Nodes (12): BOOTSTRAP_SCRIPT_PATH, CompanyMember, CompanySummary, createCompanyForSession(), health, HumanUser, invitedUser, ownerUser (+4 more)
Community 296 - "Community 296"
Cohesion: 0.10 Nodes (14): PaperclipIssueRuntimeReassignment, PaperclipIssueRuntimeSendOptions, container, firstMessages, firstOnSend, messages, onSend, root (+6 more)
Community 297 - "Community 297"
Cohesion: 0.10 Nodes (20): agentPath, buildFakeAgentScript(), buildInstallSimulationCommand(), captureDir, homeDir, managedCaptureDir, preferredCommandPath, PrepareCursorSandboxCommandInput (+12 more)
Community 298 - "Community 298"
Cohesion: 0.12 Nodes (17): DevServerHealthStatus, DevServerRestartRequest, getDevServerRestartRequestFilePath(), normalizeStringArray(), normalizeTimestamp(), PersistedDevServerStatus, readPersistedDevServerStatus(), toDevServerHealthStatus() (+9 more)
Community 299 - "Community 299"
Cohesion: 0.13 Nodes (17): CompanyUserRow, dayKeyExpr(), isoDay(), loadDailyStats(), loadWindowStats(), PROFILE_WINDOWS, resolveCompanyUser(), slugifyUserPart() (+9 more)
Community 300 - "Community 300"
Cohesion: 0.10 Nodes (18): IssueWorkProductRow, workProductService(), existingRow, insertedRow, insertReturning, insertValues, selectFrom, selectWhere (+10 more)
Community 301 - "Community 301"
Cohesion: 0.09 Nodes (19): agentId, blockedIssueId, blockedRunId, blockedWakeupRequestId, blockerId, childCommentId, companyId, firstIssueId (+11 more)
Community 302 - "Community 302"
Cohesion: 0.14 Nodes (22): calculateInvestorStatuses(), createCouncil(), createUnion(), editCouncil(), editUnion(), getCurrentOK(), getDepartmentName(), getUniqueUnionName() (+14 more)
Community 303 - "Community 303"
Cohesion: 0.14 Nodes (22): calculateInvestorStatuses(), createCouncil(), createUnion(), editCouncil(), editUnion(), getCurrentOK(), getDepartmentName(), getUniqueUnionName() (+14 more)
Community 304 - "Community 304"
Cohesion: 0.16 Nodes (22): calculateBurnAt(), calculateSpiritualDynamics(), calculateWeight(), closeTransferConfirmModal(), confirmTransfer(), emitUE(), generateTxId(), getCurrentPhase() (+14 more)
Community 305 - "Community 305"
Cohesion: 0.11 Nodes (13): acpxLocalUIAdapter, buildSchemaAdapterConfig(), failedSchemaTypes, fieldMatchesVisibleWhen(), invalidateConfigSchemaCache(), schemaCache, SchemaConfigFields(), schemaFetchInflight (+5 more)
Community 306 - "Community 306"
Cohesion: 0.17 Nodes (16): GrammarEngine, ALLOWED_CHARS, classifyOK(), COMMON_ALL, COMMON_PAIRS, DIGITS, fs, getCanonicalAlphabet() (+8 more)
Community 307 - "Community 307"
Cohesion: 0.10 Nodes (12): IssueAssignedBacklogNotice(), IssueAssignedBacklogNoticeProps, baseAgent, button, notice, onResume, AssignedBacklogBanner, BlockedByParkedWork (+4 more)
Community 308 - "Community 308"
Cohesion: 0.11 Nodes (20): actual, compareButton, confirmButtons, createRevision(), createRoutine(), current, env, flush() (+12 more)
Community 309 - "Community 309"
Cohesion: 0.16 Nodes (19): kons, participants, pg_database, pg_stat_activity, pg_stat_statements, prometheus_active_kons_count(), prometheus_active_ok_count(), prometheus_avg_reputation_weight() (+11 more)
Community 310 - "Community 310"
Cohesion: 0.10 Nodes (19): acceptInviteMock, approvalLinks, authForm, emailInput, existingAccountButton, getInviteMock, getSessionMock, healthGetMock (+11 more)
Community 311 - "Community 311"
Cohesion: 0.10 Nodes (17): buildRoutineGroups(), sortRoutines(), callsWithMentions, createButton, groupButton, groups, hasMentionOptions, issuesListMock (+9 more)
Community 312 - "Community 312"
Cohesion: 0.20 Nodes (17): expandHomePrefix(), resolveDefaultBackupDir(), resolveDefaultEmbeddedPostgresDir(), resolveDefaultLogsDir(), resolveDefaultSecretsKeyFilePath(), resolveDefaultStorageDir(), resolveHomeAwarePath(), resolveManagedProjectWorkspaceDir() (+9 more)
Community 313 - "Community 313"
Cohesion: 0.13 Nodes (15): RECOVERY_REASON_KINDS, ACTIONABLE_LIVENESS_STATES, AgentRow, buildRunLivenessContinuationIdempotencyKey(), CONTINUATION_ACTIVE_ISSUE_STATUSES, CONTINUATION_AGENT_STATUSES, decideRunLivenessContinuation(), findExistingRunLivenessContinuationWake() (+7 more)
Community 314 - "Community 314"
Cohesion: 0.10 Nodes (14): cloudHeaders, createApp(), exportRequest, importRequest, mockAccessService, mockAgentService, mockBudgetService, mockCompanyPortabilityService (+6 more)
Community 315 - "Community 315"
Cohesion: 0.10 Nodes (18): app, currentActor, environment, mockAccessService, mockAgentService, mockEnvironmentService, mockExecutionWorkspaceService, mockIssueService (+10 more)
Community 316 - "Community 316"
Cohesion: 0.10 Nodes (14): byPackageName, call, captured, cases, discovered, executeTool, getTool, jobStore (+6 more)
Community 317 - "Community 317"
Cohesion: 0.10 Nodes (21): fixInitialGiftOK(), init(), initCrossTransactionFramework(), initDepartmentsGrid(), initDevPanel(), initEmission(), initGratitudeReasonHandler(), initMusicToggle() (+13 more)
Community 318 - "Community 318"
Cohesion: 0.10 Nodes (21): fixInitialGiftOK(), init(), initCrossTransactionFramework(), initDepartmentsGrid(), initDevPanel(), initEmission(), initGratitudeReasonHandler(), initMusicToggle() (+13 more)
Community 319 - "Community 319"
Cohesion: 0.15 Nodes (21): addWeeklyEvent(), createCouncil(), createUnion(), deleteCouncil(), deleteUnion(), editCouncil(), editUnion(), getCurrentOK() (+13 more)
Community 320 - "Community 320"
Cohesion: 0.13 Nodes (10): cloudUpstreamsApi, ACTIVATION_CATEGORIES, ActivationChecklist(), activationChecklistFromReport(), buildActivationRows(), CloudUpstream(), formatBytes(), formatDate() (+2 more)
Community 321 - "Community 321"
Cohesion: 0.12 Nodes (18): buildWorktreeEnvEntries(), formatShellExports(), generateWorktreeColor(), hslComponentToHex(), hslToHex(), isWorktreeSeedMode(), MINIMAL_WORKTREE_EXCLUDED_TABLES, MINIMAL_WORKTREE_NULLIFIED_COLUMNS (+10 more)
Community 322 - "Community 322"
Cohesion: 0.11 Nodes (10): SuccessfulRunHandoffCommentCallout(), ActivityEvents, AllStates, EscalationComment, handoffIssue(), IssueCardIndicator, IssueCardPanel(), PinnedNotice (+2 more)
Community 323 - "Community 323"
Cohesion: 0.16 Nodes (16): AgentOrderUpdatedDetail, UseAgentOrderParams, AgentOrderUpdatedDetail, AgentSidebarSortMode, AgentSortModeUpdatedDetail, getAgentOrderStorageKey(), getAgentSortModeStorageKey(), normalizeIdList() (+8 more)
Community 324 - "Community 324"
Cohesion: 0.20 Nodes (16): companies, findCompanyByPrefix(), getRememberedPathOwnerCompanyId(), GLOBAL_SEGMENTS, isRememberableCompanyPath(), sanitizeRememberedPathForCompany(), applyCompanyPrefix(), BOARD_ROUTE_ROOTS (+8 more)
Community 325 - "Community 325"
Cohesion: 0.10 Nodes (18): btn, desktopTargets, desktopViewport, __dirname, entry, mobileTargets, mobileViewport, outDir (+10 more)
Community 326 - "Community 326"
Cohesion: 0.14 Nodes (9): isLocalBridgeHost(), LOCALHOST_HOSTNAMES, parseCloudflareDriverConfig(), readBoolean(), readInteger(), readTrimmedString(), validateCloudflareDriverConfig(), readIssueId() (+1 more)
Community 327 - "Community 327"
Cohesion: 0.14 Nodes (17): BUILTIN_ROUTINE_VARIABLE_NAMES, extractRoutineVariableNames(), getBuiltinRoutineVariableValues(), HUMAN_TIMESTAMP_FORMATTER, interpolateRoutineTemplate(), isBuiltinRoutineVariable(), isValidRoutineVariableName(), normalizeRoutineTemplateInput() (+9 more)
Community 328 - "Community 328"
Cohesion: 0.16 Nodes (16): buildWorkspaceCommandDefinition(), deriveWorkspaceCommandId(), findWorkspaceCommandDefinition(), listWorkspaceCommandDefinitions(), listWorkspaceServiceCommandDefinitions(), matchWorkspaceRuntimeServiceToCommand(), readCommandEntries(), readNonEmptyString() (+8 more)
Community 329 - "Community 329"
Cohesion: 0.10 Nodes (15): adapter, listModels, mockAccessService, mockAgentInstructionsService, mockApprovalService, mockBudgetService, mockCompanySkillService, mockEnvironmentService (+7 more)
Community 330 - "Community 330"
Cohesion: 0.10 Nodes (11): decide, mockAccessService, mockAgentService, mockCompanyService, mockDocumentService, mockHeartbeatService, mockIssueRecoveryActionService, mockIssueService (+3 more)
Community 331 - "Community 331"
Cohesion: 0.10 Nodes (18): legacyProjectLinkedIssue, mockAccessService, mockAgentService, mockDb, mockDocumentsService, mockEnvironmentService, mockExecutionWorkspaceService, mockFeedbackService (+10 more)
Community 332 - "Community 332"
Cohesion: 0.19 Nodes (16): resetCodexModelsCacheForTests(), collectFromJsonValue(), CursorModelsCommandResult, dedupeModels(), fetchCursorModelsFromCli(), isLikelyModelId(), listCursorModels(), mergedWithFallback() (+8 more)
Community 333 - "Community 333"
Cohesion: 0.18 Nodes (11): buildInvocationEnvForLogs(), runChildProcess(), execute(), httpAdapter, normalizeMethod(), summarizeStatus(), testEnvironment(), execute() (+3 more)
Community 334 - "Community 334"
Cohesion: 0.33 Nodes (12): calculateBurnAt(), calculateSilence(), getCurrentPhase(), getCurrentTime(), getCurrentTimeISO(), getNextMidnightUTC(), getWindowStart(), isEmissionAllowed() (+4 more)
Community 335 - "Community 335"
Cohesion: 0.11 Nodes (17): buttons, clipboardWriteTextMock, copyLinkButton, createButton, createCompanyInviteMock, inviteHistory, inviteInput, invites (+9 more)
Community 336 - "Community 336"
Cohesion: 0.18 Nodes (9): approvalComments, approvals, budgetIncidents, budgetPolicies, invites, issueApprovals, issueLabels, joinRequests (+1 more)
Community 337 - "Community 337"
Cohesion: 0.11 Nodes (14): cloudUpstreamService(), sealCloudUpstreamCredential(), body, companyId, connectionId, payload, reconciledAt, remoteCalls (+6 more)
Community 338 - "Community 338"
Cohesion: 0.11 Nodes (16): blockedIssueId, blockerIssueId, childIssueId, issueId, issuePrefix(), originRunId, otherCompanyId, pluginId (+8 more)
Community 339 - "Community 339"
Cohesion: 0.11 Nodes (19): fixInitialGiftOK(), init(), initAct1Tabs(), initEmission(), initMusicToggle(), initOrderChat(), initOrdersSVG(), initValuationsToggle() (+11 more)
Community 340 - "Community 340"
Cohesion: 0.15 Nodes (19): assertExpectedHash(), assertPagePath(), assertPageWriteAllowed(), assertRawPath(), assertWikiPath(), bootstrapSpaceFiles(), captureWikiSource(), contentHash() (+11 more)
Community 341 - "Community 341"
Cohesion: 0.14 Nodes (17): after, beforeTexts, current, fail(), i18nElements, i18nHtmlElements, i18nPlaceholderElements, info() (+9 more)
Community 342 - "Community 342"
Cohesion: 0.14 Nodes (17): after, beforeTexts, current, fail(), i18nElements, i18nHtmlElements, i18nPlaceholderElements, info() (+9 more)
Community 343 - "Community 343"
Cohesion: 0.14 Nodes (17): after, beforeTexts, current, fail(), i18nElements, i18nHtmlElements, i18nPlaceholderElements, info() (+9 more)
Community 344 - "Community 344"
Cohesion: 0.14 Nodes (17): after, beforeTexts, current, fail(), i18nElements, i18nHtmlElements, i18nPlaceholderElements, info() (+9 more)
Community 345 - "Community 345"
Cohesion: 0.14 Nodes (17): after, beforeTexts, current, fail(), i18nElements, i18nHtmlElements, i18nPlaceholderElements, info() (+9 more)
Community 346 - "Community 346"
Cohesion: 0.40 Nodes (14): CANON_FILES, CRITICAL_FILES, detectTensions(), { execSync }, findDuplicates(), fs, generateInventory(), getFileInfo() (+6 more)
Community 347 - "Community 347"
Cohesion: 0.12 Nodes (17): action, alphabeticalItem, browseLink, caret, currentRoot, flushReact(), newProjectButton, newProjectItem (+9 more)
Community 348 - "Community 348"
Cohesion: 0.16 Nodes (17): BLOCKED_GROUP_OPTIONS, BLOCKED_REASON_VARIANT_ORDER, BLOCKED_SORT_OPTIONS, BLOCKED_VARIANT_LABELS, blockedBadgeTone(), BlockedInboxBadgeTone, BlockedInboxGroup, blockedRowRecencyMs() (+9 more)
Community 349 - "Community 349"
Cohesion: 0.11 Nodes (16): archiveMemberMock, confirmButton, editButton, listAgentsMock, listIssuesMock, listJoinRequestsMock, listMembersMock, mockNavigate (+8 more)
Community 350 - "Community 350"
Cohesion: 0.18 Nodes (15): buildSeedSnapshotKey(), collectSeedFiles(), isAlreadyExistsError(), materializeSeedSnapshot(), nonEmpty(), pathExists(), prepareClaudeConfigSeed(), resolveManagedClaudeConfigSeedDir() (+7 more)
Community 351 - "Community 351"
Cohesion: 0.27 Nodes (12): alternateWorkspaceDir, call, cleanupDirs, codexHomeDir, command, dir, instructionsPath, modelProbeCall (+4 more)
Community 352 - "Community 352"
Cohesion: 0.18 Nodes (15): bootstrapDevRunnerWorktreeEnv(), expandHomePrefix(), isLinkedGitWorktreeCheckout(), parseEnvFile(), repairStaleMigratedWorktreeEnvEntries(), resolveDefaultWorktreeHome(), resolveHomeAwarePath(), resolveWorktreeEnvFilePath() (+7 more)
Community 353 - "Community 353"
Cohesion: 0.11 Nodes (15): acpxLocal, app, codexLocal, cursorAdapter, declaredSessionManagement, externalModule, grokAdapter, hermesAdapter (+7 more)
Community 354 - "Community 354"
Cohesion: 0.11 Nodes (14): agentId, assigneeAgentId, companyId, deferredContext, hasHandoffComment, hasHandoffWake, heartbeat, issueId (+6 more)
Community 355 - "Community 355"
Cohesion: 0.14 Nodes (12): ActiveRunPanelRecoveryChips, AllStatesPanel(), BlockerNoticePanel(), BlockerNoticeRecoveryIndicators, buildAction(), buildBlocker(), InboxRowChips, InboxRowPanel() (+4 more)
Community 356 - "Community 356"
Cohesion: 0.15 Nodes (12): DevServerHealthStatus, describeReason(), DevRestartBanner(), formatRelativeTimestamp(), button, devServer, mockHealthApi, node (+4 more)
Community 357 - "Community 357"
Cohesion: 0.19 Nodes (14): BetterAuthInstance, BetterAuthSessionResult, BetterAuthSessionUser, buildBetterAuthAdvancedOptions(), createBetterAuthInstance(), deriveAuthCookiePrefix(), deriveAuthTrustedOrigins(), headersFromExpressRequest() (+6 more)
Community 358 - "Community 358"
Cohesion: 0.24 Nodes (15): check_patterns(), cleanup_old_state_files(), debug_log(), extract_content_from_input(), get_state_file(), load_state(), main(), Get session-specific state file path. (+7 more)
Community 359 - "Community 359"
Cohesion: 0.12 Nodes (12): adaptersIndex, hrefs, hybridPlugin, linearIndex, links, mockPluginsApi, pluginLinks, pluginsIndex (+4 more)
Community 360 - "Community 360"
Cohesion: 0.13 Nodes (16): act(), [firstSegment, secondSegment], flushReact(), mockCompanyState, mockHealthApi, mockInstanceSettingsApi, mockNavigate, mockPluginSlotContexts (+8 more)
Community 361 - "Community 361"
Cohesion: 0.16 Nodes (11): actorMiddleware(), ActorMiddlewareOptions, cloudTenantCompanyId(), constantTimeStringEqual(), issuePrefixForCloudStack(), requiredCloudHeader(), resolveCloudTenantActor(), stackMembershipRole() (+3 more)
Community 362 - "Community 362"
Cohesion: 0.33 Nodes (16): activity_log, agent_api_keys, agents, approvals, companies, cost_events, goals, heartbeat_runs (+8 more)
Community 363 - "Community 363"
Cohesion: 0.13 Nodes (14): act(), activateButton, connectButton, flushReact(), input, mockCloudUpstreamsApi, mockCompanyState, mockInstanceSettingsApi (+6 more)
Community 364 - "Community 364"
Cohesion: 0.12 Nodes (15): editButton, mockAccessApi, mockAssetsApi, mockCompaniesApi, mockEnvironmentsApi, mockInstanceSettingsApi, mockPushToast, mockSecretsApi (+7 more)
Community 365 - "Community 365"
Cohesion: 0.19 Nodes (10): getConfigSchema(), sessionCodec, AcpxSkillAgent, buildAcpxSkillSnapshot(), configuredDetail(), listAcpxSkills(), normalizeAcpxSkillAgent(), syncAcpxSkills() (+2 more)
Community 366 - "Community 366"
Cohesion: 0.17 Nodes (11): main(), parseArg(), Closeable, ensureUiDir(), getUiBuildSnapshot(), listFilesRecursive(), PluginDevServer, PluginDevServerOptions (+3 more)
Community 367 - "Community 367"
Cohesion: 0.18 Nodes (15): OrgChartOverlay, buildOrgTree(), CompanyPackage, inferRole(), main(), parseCompanyPackage(), parseFrontmatter(), ROLE_LABELS (+7 more)
Community 368 - "Community 368"
Cohesion: 0.15 Nodes (14): child, ignoreArgs, require, serverRoot, tsxCliPath, addIgnorePath(), resolveServerDevWatchIgnorePaths(), toGlobstarPath() (+6 more)
Community 369 - "Community 369"
Cohesion: 0.19 Nodes (15): buildHeartbeatRunStopMetadata(), defaultTimeoutSecForAdapter(), hasOwn(), HeartbeatRunOutcome, HeartbeatRunStopMetadata, HeartbeatRunStopReason, HeartbeatRunTimeoutPolicy, inferHeartbeatRunStopReason() (+7 more)
Community 370 - "Community 370"
Cohesion: 0.12 Nodes (12): externalAdapter, mockAccessService, mockAgentInstructionsService, mockAgentService, mockApprovalService, mockBudgetService, mockCompanySkillService, mockHeartbeatService (+4 more)
Community 371 - "Community 371"
Cohesion: 0.12 Nodes (9): commentId, hasActiveRun, issueId, lockOwnerRunId, mockAdapterExecute, otherAgentId, replacementAgentId, SeedOptions (+1 more)
Community 372 - "Community 372"
Cohesion: 0.18 Nodes (17): applyMonitorTransition(), blankExecutionState(), buildClearedMonitorState(), buildInitialIssueMonitorFields(), buildIssueMonitorClearedPatch(), buildIssueMonitorTriggeredPatch(), buildScheduledMonitorState(), buildTriggeredMonitorState() (+9 more)
Community 373 - "Community 373"
Cohesion: 0.20 Nodes (17): createSpace(), ensureDefaultSpace(), fallbackDefaultSpace(), jsonParam(), listSpaces(), normalizePaperclipIngestionSourceScope(), normalizeSpaceSlug(), parseJsonObject() (+9 more)
Community 374 - "Community 374"
Cohesion: 0.13 Nodes (10): PROTOCOL_BOOSS, PROTOCOL_KOL, PROTOCOL_PLAN, PROTOCOL_TOK, PROTOCOL_VES, PROTOCOL_PLAN, PROTOCOL_TOK, PROTOCOL_KOL (+2 more)
Community 375 - "Community 375"
Cohesion: 0.13 Nodes (14): agentMap, baseTimestamps, codexAgent, comment, copyLink, copyText, detailsId, row (+6 more)
Community 376 - "Community 376"
Cohesion: 0.13 Nodes (14): backButton, clipboardWriteTextMock, closeNewAgentMock, createCompanyInviteMock, generateButton, getInviteOnboardingMock, inviteButton, listAdaptersMock (+6 more)
Community 377 - "Community 377"
Cohesion: 0.21 Nodes (12): normalizeHostnameInput(), parseHostnameCsv(), BaseServerInput, buildCustomServerConfig(), buildPresetServerConfig(), detectTailnetBindHost(), inferConfiguredBind(), resolveQuickstartServerConfig() (+4 more)
Community 378 - "Community 378"
Cohesion: 0.13 Nodes (13): mockAgentsApi, mockAssetsApi, mockBudgetsApi, mockExecutionWorkspacesApi, mockHeartbeatsApi, mockInstanceSettingsApi, mockIssuesApi, mockIssuesList (+5 more)
Community 379 - "Community 379"
Cohesion: 0.13 Nodes (12): enabledDetailTabFilters, mockNavigate, mockPluginSlotMount, mockPluginSlotState, mockProjectsApi, mockRouteSearch, mockSetBreadcrumbs, mockSetSelectedCompanyId (+4 more)
Community 380 - "Community 380"
Cohesion: 0.14 Nodes (11): acquirePromise, body, child, fetchMock, firstSpawnArgs, MockChildProcess, requestBodyAt(), requestHeadersAt() (+3 more)
Community 381 - "Community 381"
Cohesion: 0.13 Nodes (14): allDeps, allOptionalDeps, devPkgPath, __dirname, externalWorkspacePackages, outPath, pkg, pkgDirMap (+6 more)
Community 382 - "Community 382"
Cohesion: 0.22 Nodes (14): base64UrlDecode(), base64UrlEncode(), createLocalAgentJwt(), jwtConfig(), JwtHeader, LocalAgentJwtClaims, parseJson(), parseNumber() (+6 more)
Community 383 - "Community 383"
Cohesion: 0.14 Nodes (9): PluginCapabilityValidator, CapabilityScopedInvoker, DEFAULT_GLOBALS, LoadedModule, MODULE_PATH_SUFFIXES, PluginSandboxError, PluginSandboxOptions, readModuleSourceSync() (+1 more)
Community 384 - "Community 384"
Cohesion: 0.13 Nodes (7): BoardActor, PolicyDecision, ResourceMembershipPolicyHook, resourceMembershipService(), ResourceMembershipServiceOptions, app, svc
Community 385 - "Community 385"
Cohesion: 0.16 Nodes (14): buildInviteOnboardingManifest(), buildInviteOnboardingTextDocument(), buildOnboardingConnectionCandidates(), buildOnboardingDiscoveryDiagnostics(), extractInviteHumanRole(), extractInviteMessage(), isLoopbackHost(), normalizeHostname() (+6 more)
Community 386 - "Community 386"
Cohesion: 0.13 Nodes (12): dbMock, handoffActivityRow, issue, mockAccessService, mockFeedbackService, mockHeartbeatService, mockInstanceSettingsService, mockIssueService (+4 more)
Community 387 - "Community 387"
Cohesion: 0.13 Nodes (13): mockAccessService, mockAgentService, mockEnvironmentService, mockExecutionWorkspaceService, mockFeedbackExportService, mockFeedbackService, mockHeartbeatService, mockInstanceSettingsService (+5 more)
Community 388 - "Community 388"
Cohesion: 0.13 Nodes (15): appendStderrExcerpt(), createPluginWorkerHandle(), formatWorkerFailureMessage(), companiesGet, DELAYED_WORKER_ENTRYPOINT, FIXTURES_DIR, handle, handlers (+7 more)
Community 389 - "Community 389"
Cohesion: 0.14 Nodes (12): CachedViteHtmlRenderer, createCachedViteHtmlRenderer(), ViteWatcherEvent, ViteWatcherHost, WATCHER_EVENTS, indexPath, renderer, sourcePath (+4 more)
Community 390 - "Community 390"
Cohesion: 0.13 Nodes (16): init(), initCrossTransactionFramework(), initDeptChat(), initDevPanel(), initEmission(), initGratitudeReasonHandler(), initOrderChat(), initRegistries() (+8 more)
Community 391 - "Community 391"
Cohesion: 0.16 Nodes (16): aggregateLintFindings(), basename(), buildBrowseTree(), dirname(), ensureDir(), formatTime(), isEditableWikiPagePath(), LintPanelContent() (+8 more)
Community 392 - "Community 392"
Cohesion: 0.53 Nodes (11): acts_annotations, acts_log, add_annotation(), compute_balance(), emit_ue(), open_dispute(), ro_dag_edges, transfer_ue() (+3 more)
Community 393 - "Community 393"
Cohesion: 0.45 Nodes (12): args, buildRoDagEdges(), fs, importActsLog(), log(), logError(), main(), path (+4 more)
Community 394 - "Community 394"
Cohesion: 0.16 Nodes (13): AdapterType, asErrorText(), asRecord(), HEARTBEAT_SOURCES, HEARTBEAT_TRIGGERS, heartbeatRun(), HeartbeatRunEventRecord, HeartbeatRunOptions (+5 more)
Community 395 - "Community 395"
Cohesion: 0.14 Nodes (13): companyState, dialogState, flush(), input, mockAgentsApi, mockIssuesApi, mockProjectsApi, navigateState (+5 more)
Community 396 - "Community 396"
Cohesion: 0.13 Nodes (10): backgroundClasses, body, clippedContent, deleteHighlight, hiddenText, highlights, MockHighlight, mockRangesForNormalizedSpan (+2 more)
Community 397 - "Community 397"
Cohesion: 0.13 Nodes (10): queueContainedBlurCommit(), cancel, display, onCommit, onSave, outside, preview, root (+2 more)
Community 398 - "Community 398"
Cohesion: 0.14 Nodes (10): activityIndex, continueButton, newestIndex, nextAction, oldestIndex, onWatchdogDecision, render(), renderLedger() (+2 more)
Community 399 - "Community 399"
Cohesion: 0.13 Nodes (11): branchInput, dialogContent, footer, formScrollRegion, issueWorkspaceDraft, notesInput, onSubmit, queryClient (+3 more)
Community 400 - "Community 400"
Cohesion: 0.13 Nodes (13): editButton, mockAuthApi, mockLocation, mockNavigate, mockOpenOnboarding, mockSetSelectedCompanyId, mockSetSidebarOpen, mockSidebarPreferencesApi (+5 more)
Community 401 - "Community 401"
Cohesion: 0.21 Nodes (14): account, company_memberships, instance_user_roles, invites, issues, join_requests, principal_permission_grants, public.agents (+6 more)
Community 402 - "Community 402"
Cohesion: 0.20 Nodes (13): AdapterEnvironmentSupport, adapterSupportsRemoteManagedEnvironments(), EnvironmentCapabilities, EnvironmentProviderCapability, EnvironmentSupportStatus, getAdapterEnvironmentSupport(), getEnvironmentCapabilities(), isEnvironmentDriverSupportedForAdapter() (+5 more)
Community 403 - "Community 403"
Cohesion: 0.15 Nodes (10): packageDir, packageDir, buildExpectedCatalogManifest(), errorMessage(), formatCatalogManifest(), readExistingManifest(), sameManifestExceptGeneratedAt(), tempDirs (+2 more)
Community 404 - "Community 404"
Cohesion: 0.27 Nodes (14): api(), log(), main(), phase1_probe(), phase2_order(), phase3_reinstall_with_password(), phase4_5_install(), phase6_configure() (+6 more)
Community 405 - "Community 405"
Cohesion: 0.22 Nodes (14): applyPattern(), createFeedbackRedactionState(), FeedbackRedactionState, finalizeFeedbackRedactionSummary(), FREE_TEXT_PATTERNS, increment(), isPlainRecord(), PatternReplacement (+6 more)
Community 406 - "Community 406"
Cohesion: 0.16 Nodes (10): app, createAdapter(), installApp, installedRecord(), instanceAdmin, mocks, reloadApp, requestApp() (+2 more)
Community 407 - "Community 407"
Cohesion: 0.13 Nodes (10): db, { db, limit }, liveRows, mockAgentService, mockHeartbeatService, mockInstanceSettingsService, mockIssueService, recentRows (+2 more)
Community 408 - "Community 408"
Cohesion: 0.13 Nodes (11): args, argsCapturePath, authCheck, binDir, capture, cursorAgentPath, cursorHome, cwd (+3 more)
Community 409 - "Community 409"
Cohesion: 0.13 Nodes (10): capture, capturePath, CapturePayload, commandPath, cursorAgentPath, customCommandPath, homeDir, remoteWorkspace (+2 more)
Community 410 - "Community 410"
Cohesion: 0.13 Nodes (11): mockAccessService, mockAgentService, mockDocumentsService, mockHeartbeatService, mockInstanceSettingsService, mockIssueService, mockIssueThreadInteractionService, mockLogActivity (+3 more)
Community 411 - "Community 411"
Cohesion: 0.15 Nodes (12): createExecutionWorkspaceApp(), createProjectApp(), mockAssertCanManageExecutionWorkspaceRuntimeServices, mockAssertCanManageProjectWorkspaceRuntimeServices, mockEnvironmentService, mockExecutionWorkspaceService, mockGetTelemetryClient, mockLogActivity (+4 more)
Community 412 - "Community 412"
Cohesion: 0.13 Nodes (8): blockedViewDefaults, DesktopLoaded, DesktopWithSearch, EmptyState, fixtureIssues, MobileLayout, ReasonChipCatalog, Story
Community 413 - "Community 413"
Cohesion: 0.14 Nodes (15): adapterTypeLabel(), AgentOptionLabel(), agentStatusLabel(), buildAgentHealthItems(), buildProjectHealthItems(), buildRoutineHealthItems(), buildSkillHealthItems(), DistillationSettingsPanel() (+7 more)
Community 414 - "Community 414"
Cohesion: 0.14 Nodes (13): resolveExternalAdapterRegistration(), setOverridePaused(), adapter, adapterWithCaps, adapterWithProfiles, builtIn, ctx, detectModel (+5 more)
Community 415 - "Community 415"
Cohesion: 0.22 Nodes (1): I18n
Community 416 - "Community 416"
Cohesion: 0.42 Nodes (12): CONFIG, error(), extractGoldenData(), fs, log(), main(), migrateActsLog(), migrateOKKeys() (+4 more)
Community 417 - "Community 417"
Cohesion: 0.15 Nodes (9): band, baseRetry, button, card, finalButton, getRetryNowButton(), retryNowMock, SYSTEM_NOW (+1 more)
Community 418 - "Community 418"
Cohesion: 0.15 Nodes (13): actions, branchIconButton, branchTextButton, closeSpy, createIssue(), createSummary(), pathIconButton, pathTextButton (+5 more)
Community 419 - "Community 419"
Cohesion: 0.19 Nodes (11): captureComposerViewportSnapshot(), ComposerViewportSnapshot, IssueChatScrollTarget, resolveIssueChatScrollTarget(), restoreComposerViewportSnapshot(), shouldPreserveComposerViewport(), composer, input (+3 more)
Community 420 - "Community 420"
Cohesion: 0.18 Nodes (6): getMentionAwareLinkNodeInit(), MentionAwareLinkNode, mentionAwareLinkNodeReplacement, MentionAwareLinkSource, editor, init
Community 421 - "Community 421"
Cohesion: 0.21 Nodes (13): getProjectOrderStorageKey(), getProjectSortModeStorageKey(), normalizeIdList(), normalizeSortMode(), ProjectOrderUpdatedDetail, ProjectSidebarSortMode, ProjectSortModeUpdatedDetail, readProjectOrder() (+5 more)
Community 422 - "Community 422"
Cohesion: 0.18 Nodes (8): normalizeAllowedHostnames(), privateHostnameGuard(), resolvePrivateHostnameAllowSet(), app, middleware, next, req, res
Community 423 - "Community 423"
Cohesion: 0.27 Nodes (13): plugin_llm_wiki_8f50da974f.paperclip_distillation_cursors, plugin_llm_wiki_8f50da974f.paperclip_distillation_runs, plugin_llm_wiki_8f50da974f.paperclip_distillation_work_items, plugin_llm_wiki_8f50da974f.paperclip_page_bindings, plugin_llm_wiki_8f50da974f.paperclip_source_snapshots, plugin_llm_wiki_8f50da974f.wiki_operations, plugin_llm_wiki_8f50da974f.wiki_page_revisions, plugin_llm_wiki_8f50da974f.wiki_pages (+5 more)
Community 424 - "Community 424"
Cohesion: 0.15 Nodes (12): buildSearchUrl(), agentsApiMock, breadcrumbState, companyState, dialogState, flush(), input, navigateMock (+4 more)
Community 425 - "Community 425"
Cohesion: 0.15 Nodes (12): attachedRun, cancelledRun, { createMock, resumeMock, getRunMock }, createMockRun(), createMockSdkAgent(), followUpRun, logChunks, MockAgentOptions (+4 more)
Community 426 - "Community 426"
Cohesion: 0.14 Nodes (10): archiveButton, BridgeGlobal, closeButton, confirm, consoleOutput, file, FileTreeNodeLike, FileTreePropsLike (+2 more)
Community 427 - "Community 427"
Cohesion: 0.16 Nodes (11): WorkspaceDiffQueryOptions, WORKSPACE_DIFF_CAPS, byPath, createTempRepo(), execFileAsync, leak, runGit(), secretPath (+3 more)
Community 428 - "Community 428"
Cohesion: 0.18 Nodes (11): authorizeUpgrade(), hashToken(), headersFromIncomingMessage(), IncomingMessageWithContext, parseBearerToken(), require, setupLiveEventsWebSocketServer(), UpgradeContext (+3 more)
Community 429 - "Community 429"
Cohesion: 0.23 Nodes (11): decodeMasterKey(), encryptValue(), enforceKeyFilePermissionsBestEffort(), inspectLocalEncryptedHealth(), loadOrCreateMasterKey(), LocalEncryptedMaterial, prepareManagedVersion(), resolveMasterKeyFilePath() (+3 more)
Community 430 - "Community 430"
Cohesion: 0.24 Nodes (11): companySkillService(), buildDeclaredSkillFiles(), buildDefaultMarkdown(), buildPackageFiles(), buildSkillDefaults(), canonicalSkillKey(), pluginKeySlug(), pluginManagedSkillService() (+3 more)
Community 431 - "Community 431"
Cohesion: 0.15 Nodes (11): assetCatalogSkill, assetFiles, cleanupDirs, contentHash(), importedFiles, mockCatalogService, sampleAssetBytes, sampleCatalogSkill (+3 more)
Community 432 - "Community 432"
Cohesion: 0.15 Nodes (9): accessServiceMock, app, createApp(), createAppWithActor(), { db, insertedValues, updateValues }, { db, updateMock }, { db, updateValues }, logActivityMock (+1 more)
Community 433 - "Community 433"
Cohesion: 0.14 Nodes (9): PluginBridgeContextValue, container, html, markdownHtml, nodes, root, source, FileTree (+1 more)
Community 434 - "Community 434"
Cohesion: 0.14 Nodes (14): init(), initDepartmentsGrid(), initDevPanel(), initEmission(), initGratitudeReasonHandler(), initRegistries(), initValuationsToggle(), renderAllDepartmentStatuses() (+6 more)
Community 435 - "Community 435"
Cohesion: 0.24 Nodes (8): asRecord(), formatJsonObject(), JsonFieldProps, PayloadTemplateJsonField(), RuntimeServicesJsonField(), OpenClawGatewayConfigFields(), parseScopes(), openClawGatewayUIAdapter
Community 436 - "Community 436"
Cohesion: 0.49 Nodes (9): acts_annotations, acts_log, acts_log_immutable, acts_log_merkle, ok_identity, prevent_mutation(), ro_dag_edges, set_merkle_hash() (+1 more)
Community 437 - "Community 437"
Cohesion: 0.15 Nodes (11): baseUrl, ceoAgentAfterCreate, company, companyAfterAgent, desktopPlanningToggle, mobilePlanningToggle, openedIssueIdentifier, openedIssueUrl (+3 more)
Community 438 - "Community 438"
Cohesion: 0.24 Nodes (9): buildPortableAgentSlugMap(), buildPortableProjectSlugMap(), buildPortableSidebarOrder(), alphaOne, alphaTwo, beta, launch, launchTwo (+1 more)
Community 439 - "Community 439"
Cohesion: 0.28 Nodes (12): plugin_company_settings, plugin_config, plugin_entities, plugin_job_runs, plugin_jobs, plugin_logs, plugin_state, plugin_webhook_deliveries (+4 more)
Community 440 - "Community 440"
Cohesion: 0.32 Nodes (12): issues, public.agents, public.companies, public.company_secrets, public.goals, public.issues, public.projects, public.routine_triggers (+4 more)
Community 441 - "Community 441"
Cohesion: 0.24 Nodes (11): act(), bravoLink, chooseSortField(), flushReact(), hiddenDescriptionLine, mockOpenNewProject, mockProjectsApi, mockResourceMembershipsApi (+3 more)
Community 442 - "Community 442"
Cohesion: 0.38 Nodes (7): companies, documentAnnotationAnchorSnapshots, documentAnnotationComments, documentAnnotationThreads, documentRevisions, documents, issueDocuments
Community 443 - "Community 443"
Cohesion: 0.21 Nodes (6): buildErrorMessage(), isWriteMethod(), JsonRequestOptions, PaperclipApiClient, PaperclipApiError, parseResponseBody()
Community 444 - "Community 444"
Cohesion: 0.17 Nodes (11): createToolDefinitions(), makeTool(), [controlUrl, controlInit], fetchMock, getTool(), [, init], [lookupUrl, lookupInit], makeClient() (+3 more)
Community 445 - "Community 445"
Cohesion: 0.21 Nodes (10): buildManualDistillPrompt(), ManagedRoutineDefaultDrift, ManagedRoutineSettingsResolution, manualDistillScopeLabel(), normalizeRoutineTemplateText(), PAPERCLIP_EVENT_INGESTION_EVENTS, routineKeyField(), routineOverridesFromParams() (+2 more)
Community 446 - "Community 446"
Cohesion: 0.24 Nodes (9): readOptionalString(), readString(), resolveDefaultBaseRef(), resolveProjectWorkspaceDefaultBaseRef(), workspaceDiffService(), createGitWorkspace(), execFileAsync, git() (+1 more)
Community 447 - "Community 447"
Cohesion: 0.35 Nodes (11): buildIssueReferenceHref(), extractIssueReferenceIdentifiers(), extractIssueReferenceMatches(), findIssueReferenceMatches(), IssueReferenceMatch, normalizeIssueIdentifier(), parseIssueReferenceHref(), preserveNewlinesAsWhitespace() (+3 more)
Community 448 - "Community 448"
Cohesion: 0.26 Nodes (10): skillsById, skillsByKey, CatalogCompatibility, CatalogManifest, CatalogSkill, CatalogSkillFile, CatalogSkillFileKind, CatalogSkillKind (+2 more)
Community 449 - "Community 449"
Cohesion: 0.15 Nodes (8): mockAccessService, mockAgentInstructionsService, mockAgentService, mockEnvironmentService, mockFindServerAdapter, mockLogActivity, mockSecretService, mockSyncInstructionsBundleConfigFromFilePath
Community 450 - "Community 450"
Cohesion: 0.15 Nodes (10): externalAdapter, mockAccessService, mockAgentService, mockEnvironmentRuntime, mockEnvironmentService, mockInstanceSettingsService, mockReleaseRunLease, mockResolveEnvironmentExecutionTarget (+2 more)
Community 451 - "Community 451"
Cohesion: 0.15 Nodes (7): mockAccessService, mockFeedbackService, mockHeartbeatService, mockInstanceSettingsService, mockIssueService, mockIssueThreadInteractionService, mockLogActivity
Community 452 - "Community 452"
Cohesion: 0.15 Nodes (10): createPayload, issue, mockAccessService, mockHeartbeatService, mockIssueApprovalService, mockIssueService, mockIssueThreadInteractionService, mockLogActivity (+2 more)
Community 453 - "Community 453"
Cohesion: 0.19 Nodes (12): approvalOnly, approvalOnlyPolicy(), makePolicy(), policy, result, reviewAndApproval, reviewInstructions, reviewOnly (+4 more)
Community 454 - "Community 454"
Cohesion: 0.15 Nodes (9): mockAccessService, mockAgentService, mockExecutionWorkspaceService, mockFeedbackService, mockHeartbeatService, mockInstanceSettingsService, mockIssueService, mockLogActivity (+1 more)
Community 455 - "Community 455"
Cohesion: 0.15 Nodes (9): app, companyBranding, db, logoAsset, mockAccessService, mockAgentService, mockBoardAuthService, mockLogActivity (+1 more)
Community 456 - "Community 456"
Cohesion: 0.21 Nodes (13): calculateWeight(), checkBurn(), getActiveUEEmittedToday(), getInternalTime(), getTimeToBurn(), getTimeUntilMidnight(), getUEBalance(), isSilenceZone() (+5 more)
Community 457 - "Community 457"
Cohesion: 0.21 Nodes (13): calculateWeight(), checkBurn(), getActiveUEEmittedToday(), getInternalTime(), getTimeToBurn(), getTimeUntilMidnight(), getUEBalance(), isSilenceZone() (+5 more)
Community 458 - "Community 458"
Cohesion: 0.17 Nodes (13): buildCanonicalRecord(), colorizeOK(), formatTransactionRecord(), generateDisputeCode(), generateDisputeLink(), generateTransactionLink(), getCorrectLength(), loadDisputes() (+5 more)
Community 459 - "Community 459"
Cohesion: 0.15 Nodes (13): activateImpulseUE(), filterByNormRule(), getAlreadySentTo(), initTransfer(), isSelfGratitude(), openTransferConfirmModal(), saveState(), setupIndicatorClicks() (+5 more)
Community 460 - "Community 460"
Cohesion: 0.55 Nodes (8): acts_annotations, acts_log, generate_merkle_hash(), no_update_acts_log, ok_identity, prevent_acts_log_mutation(), ro_dag_edges, set_merkle_hash
Community 461 - "Community 461"
Cohesion: 0.29 Nodes (11): checkCanon(), checkCore(), detectTensions(), exists(), formatDate(), fs, generateReport(), path (+3 more)
Community 462 - "Community 462"
Cohesion: 0.41 Nodes (9): ACT_TYPES(), canAccess(), canAct(), getPhase(), isBridge(), isSystemReserve(), isValidOK(), PHASES() (+1 more)
Community 463 - "Community 463"
Cohesion: 0.33 Nodes (10): acts_log, acts_log_immutable, acts_log_merkle, annotations, ok_identity, prevent_mutation(), ro_dag_edges, set_merkle_hash() (+2 more)
Community 464 - "Community 464"
Cohesion: 0.38 Nodes (10): collectEnvLabDoctorStatus(), envLabDoctorCommand(), envLabDownCommand(), envLabStatusCommand(), envLabUpCommand(), printJson(), registerEnvLabCommands(), resolveEnvLabSshStatePath() (+2 more)
Community 465 - "Community 465"
Cohesion: 0.20 Nodes (10): createIssueRun(), createRun(), flushReact(), issueLink, mockHeartbeatsApi, mockIssuesApi, moreLink, queryClient (+2 more)
Community 466 - "Community 466"
Cohesion: 0.17 Nodes (7): banner, blockedViewProps, issues, links, mockIssuesApi, { root }, titles
Community 467 - "Community 467"
Cohesion: 0.17 Nodes (11): CommentThread(), agent, approval, approvalRow, copyButton, editor, onAdd, root (+3 more)
Community 468 - "Community 468"
Cohesion: 0.17 Nodes (10): badges, issue, link, markReadButton, metaRow, root, state, statusIcon (+2 more)
Community 469 - "Community 469"
Cohesion: 0.17 Nodes (11): agentNameInput, baseUrl, ceoAgent, ceoAgentAfterCreate, company, companyAfterAgent, companyNameInput, nextButton (+3 more)
Community 470 - "Community 470"
Cohesion: 0.21 Nodes (8): AgentAuth, agentCheckoutAndPatch(), agentPatch(), getIssueRunLockState(), invokeHeartbeat(), IssueRunLockState, PORT, TestContext
Community 471 - "Community 471"
Cohesion: 0.17 Nodes (9): getContainerTextOffset(), anchor, container, merged, offset, outside, range, ranges (+1 more)
Community 472 - "Community 472"
Cohesion: 0.17 Nodes (9): dkr, filePath, info, pool, PROJECT_ROOT, r, server, sql (+1 more)
Community 473 - "Community 473"
Cohesion: 0.38 Nodes (11): execution_workspaces, issue_work_products, issues, public.companies, public.execution_workspaces, public.heartbeat_runs, public.issues, public.project_workspaces (+3 more)
Community 474 - "Community 474"
Cohesion: 0.17 Nodes (9): cleanup, cleanups, columns, constraints, indexes, rows, sql, tables (+1 more)
Community 475 - "Community 475"
Cohesion: 0.17 Nodes (10): catalogManifest, resolveCatalogSkillRef(), bundledKeys, EXPECTED_BUNDLED_KEYS, EXPECTED_OPTIONAL_KEYS, issues, optionalKeys, sample (+2 more)
Community 476 - "Community 476"
Cohesion: 0.24 Nodes (11): globToRegExp(), isWorkspacePackage(), listPublicPackages(), main(), parseWorkspaceEntries(), readPackageJson(), releasePackageMapPath, repoRoot (+3 more)
Community 477 - "Community 477"
Cohesion: 0.21 Nodes (11): allOutputsCurrent(), buildTargets, lockDir, needsBuild(), newestSourceMtimeMs(), result, rootDir, scriptDir (+3 more)
Community 478 - "Community 478"
Cohesion: 0.18 Nodes (8): buildGapCandidates, buildGapPackages, fail(), listWorkspacePackages(), missingNames, packagesMissingTypecheck, repoRoot, workspacePackages
Community 479 - "Community 479"
Cohesion: 0.17 Nodes (9): backlogBlocker, baseInput, baseReviewIssue, blocks, cancelled, cases, findings, manager (+1 more)
Community 480 - "Community 480"
Cohesion: 0.17 Nodes (9): mockAccessService, mockGetTelemetryClient, mockLogActivity, mockRoutineService, mockTrackRoutineCreated, pausedRoutine, revision, routine (+1 more)
Community 481 - "Community 481"
Cohesion: 0.23 Nodes (12): calculateWeight(), checkBurn(), getActiveUEEmittedToday(), getInternalTime(), getUEBalance(), isSilenceZone(), isTransferAllowed(), loadState() (+4 more)
Community 482 - "Community 482"
Cohesion: 0.23 Nodes (12): calculateBurnAt(), emitUE(), getAvailableForTransfer(), getCurrentPhase(), getUEEmittedThisPeriod(), getUEStatus(), isEmissionAllowed(), isTransferAllowed() (+4 more)
Community 483 - "Community 483"
Cohesion: 0.23 Nodes (12): calculateBurnAt(), emitUE(), getAvailableForTransfer(), getCurrentPhase(), getUEEmittedThisPeriod(), getUEStatus(), isEmissionAllowed(), isTransferAllowed() (+4 more)
Community 484 - "Community 484"
Cohesion: 0.21 Nodes (12): createCouncil(), createUnion(), editCouncil(), editUnion(), getCurrentOK(), getUniqueUnionName(), initInlineChislobukv(), initUnionsCouncils() (+4 more)
Community 485 - "Community 485"
Cohesion: 0.18 Nodes (12): isSectionKey(), normalizeSectionKey(), readActiveSpaceSlugFromLocation(), readSectionFromLocation(), readSectionFromSearch(), readSelectedTreePathFromLocation(), readSelectedTreePathFromSearch(), readSettingsSectionFromLocation() (+4 more)
Community 486 - "Community 486"
Cohesion: 0.58 Nodes (7): calculateBurnAt(), calculateSilence(), getCurrentPhase(), getInternalTime(), getMidnight(), getWindowStart(), isInWindow()
Community 487 - "Community 487"
Cohesion: 0.18 Nodes (7): IssueBlockedNotice(), baseRetry, button, indicator, node, retryNowMock, SYSTEM_NOW
Community 488 - "Community 488"
Cohesion: 0.18 Nodes (7): first, node, onResolve, ownerAgent, returnAgent, second, section
Community 489 - "Community 489"
Cohesion: 0.18 Nodes (8): editButton, environmentSelect, onUpdate, reusableWorkspace, root, saveButton, selects, useQueryMock
Community 490 - "Community 490"
Cohesion: 0.24 Nodes (6): clampSidebarWidth(), readStoredSidebarWidth(), ResizableSidebarPane(), ResizableSidebarPaneProps, separator, writeStoredSidebarWidth()
Community 491 - "Community 491"
Cohesion: 0.27 Nodes (8): get_active_ok_count(), get_burned_ue_count(), get_transactions_count(), parent_count, participants, transactions, transactions_partitioned, validate_rodag_transaction()
Community 492 - "Community 492"
Cohesion: 0.24 Nodes (7): ADAPTER_AGNOSTIC_KEYS, AgentConfigOverlay, AgentModelProfileOverlay, buildAgentUpdatePatch(), omitUndefinedEntries(), agent, patch
Community 493 - "Community 493"
Cohesion: 0.24 Nodes (6): createCurrentRevisionSnapshot(), deriveDocumentRevisionState(), DocumentRevisionState, sortRevisionsDescending(), staleDocument, state
Community 494 - "Community 494"
Cohesion: 0.27 Nodes (9): buildIssueThreadInteractionSummary(), buildSuggestedTaskTree(), collectSuggestedTaskClientKeys(), countSuggestedTaskNodes(), getQuestionAnswerLabels(), isIssueThreadInteraction(), SuggestedTaskTreeNode, labels (+1 more)
Community 495 - "Community 495"
Cohesion: 0.38 Nodes (10): plugin_llm_wiki_8f50da974f.wiki_instances, plugin_llm_wiki_8f50da974f.wiki_operations, plugin_llm_wiki_8f50da974f.wiki_page_revisions, plugin_llm_wiki_8f50da974f.wiki_pages, plugin_llm_wiki_8f50da974f.wiki_query_sessions, plugin_llm_wiki_8f50da974f.wiki_resource_bindings, plugin_llm_wiki_8f50da974f.wiki_sources, public.companies (+2 more)
Community 496 - "Community 496"
Cohesion: 0.33 Nodes (10): companies, document_revisions, feedback_exports, feedback_votes, issue_comments, public.companies, public.feedback_votes, public.heartbeat_runs (+2 more)
Community 497 - "Community 497"
Cohesion: 0.45 Nodes (10): document_annotation_anchor_snapshots, document_annotation_comments, document_annotation_threads, public.agents, public.companies, public.document_annotation_threads, public.document_revisions, public.documents (+2 more)
Community 498 - "Community 498"
Cohesion: 0.20 Nodes (8): agents, card, flushReact(), listMock, navigateMock, orgMock, orgTree, renderOrgChart()
Community 499 - "Community 499"
Cohesion: 0.29 Nodes (9): ensureLinuxSharedLibraryAliases(), pathExists(), prepareEmbeddedPostgresNativeRuntime(), prependPathEnv(), require, resolveEmbeddedPostgresPackageRoot(), resolveNativePackageName(), tempDir (+1 more)
Community 500 - "Community 500"
Cohesion: 0.20 Nodes (9): RESOURCE_MEMBERSHIP_STATES, ResourceMembershipResourceType, ResourceMemberships, ResourceMembershipState, ResourceMembershipUpdateResult, UpdateResourceMembership, resourceMembershipStateSchema, UpdateResourceMembership (+1 more)
Community 501 - "Community 501"
Cohesion: 0.29 Nodes (10): asBoolean(), asString(), asStringArray(), isPlainRecord(), MarkdownDoc, parseFrontmatterMarkdown(), parseYamlBlock(), parseYamlFrontmatter() (+2 more)
Community 502 - "Community 502"
Cohesion: 0.55 Nodes (9): buildRuntimeApiCandidateUrls(), choosePrimaryRuntimeApiUrl(), collectReachableInterfaceHosts(), formatOrigin(), isLinkLocalHost(), isLoopbackHost(), isWildcardHost(), normalizeHost() (+1 more)
Community 503 - "Community 503"
Cohesion: 0.20 Nodes (8): createLocalFileWorkspaceOperationLogStore(), getWorkspaceOperationLogStore(), WorkspaceOperationLogFinalizeSummary, WorkspaceOperationLogHandle, WorkspaceOperationLogReadOptions, WorkspaceOperationLogReadResult, WorkspaceOperationLogStore, WorkspaceOperationLogStoreType
Community 504 - "Community 504"
Cohesion: 0.27 Nodes (10): ansi, color(), EmbeddedPostgresInfo, ExternalPostgresInfo, printStartupBanner(), redactConnectionString(), resolveAgentJwtSecretStatus(), row() (+2 more)
Community 505 - "Community 505"
Cohesion: 0.22 Nodes (8): cleanupRows(), heartbeat, heartbeatSideEffectFingerprint(), seededAgentIds, tickAt, triggeredAt, triggerEvent, waitForHeartbeatSideEffectsSettled()
Community 506 - "Community 506"
Cohesion: 0.18 Nodes (8): commandPath, entries, envDumpPath, nonInjectedBinDir, nonInjectedSkillDir, skillBinDir, skillDir, workspace
Community 507 - "Community 507"
Cohesion: 0.18 Nodes (7): mockEnvironmentService, mockGetTelemetryClient, mockLogActivity, mockProjectService, mockSecretService, mockWorkspaceOperationService, normalizedEnv
Community 508 - "Community 508"
Cohesion: 0.18 Nodes (9): auth, callInit, creds, jwtPayload, labels, mockResponse, promise, snapshot (+1 more)
Community 509 - "Community 509"
Cohesion: 0.18 Nodes (8): agents, ceoAgent, companies, company, issue, issues, latestRun, runs
Community 510 - "Community 510"
Cohesion: 0.25 Nodes (11): emitUE(), getAvailableForTransfer(), getCurrentPhase(), getUEEmittedThisPeriod(), getUEStatus(), isEmissionAllowed(), saveState(), triggerOKBadgeGlow() (+3 more)
Community 511 - "Community 511"
Cohesion: 0.24 Nodes (11): createCouncil(), createUnion(), editCouncil(), editUnion(), getCurrentOK(), getUniqueUnionName(), initUnionsCouncils(), renderCouncils() (+3 more)
Community 512 - "Community 512"
Cohesion: 0.18 Nodes (11): activateImpulseUE(), filterByNormRule(), getAlreadySentTo(), initTransfer(), isSelfGratitude(), openTransferConfirmModal(), setupIndicatorClicks(), transferSelectedUE() (+3 more)
Community 513 - "Community 513"
Cohesion: 0.18 Nodes (11): activateImpulseUE(), filterByNormRule(), getAlreadySentTo(), initTransfer(), isSelfGratitude(), openTransferConfirmModal(), setupIndicatorClicks(), transferSelectedUE() (+3 more)
Community 514 - "Community 514"
Cohesion: 0.18 Nodes (11): activateImpulseUE(), filterByNormRule(), getAlreadySentTo(), initTransfer(), isSelfGratitude(), openTransferConfirmModal(), setupIndicatorClicks(), transferSelectedUE() (+3 more)
Community 515 - "Community 515"
Cohesion: 0.20 Nodes (11): buildCanonicalRecord(), colorizeOK(), formatTransactionRecord(), generateDisputeCode(), generateDisputeLink(), generateTransactionLink(), loadDisputes(), maskTemporaryKey() (+3 more)
Community 516 - "Community 516"
Cohesion: 0.24 Nodes (11): fetchDiscovery(), fetchWithTimeout(), firstPathSegment(), optionalObject(), parseRemoteResponse(), postJson(), proofHeaders(), remoteGet() (+3 more)
Community 517 - "Community 517"
Cohesion: 0.47 Nodes (7): emit, emitHour, hour, minute, nextMidnight, phase, t
Community 518 - "Community 518"
Cohesion: 0.20 Nodes (6): KanbanBoard(), resolveKanbanTargetStatus(), { container }, { container, render }, issues, showMoreButton
Community 519 - "Community 519"
Cohesion: 0.22 Nodes (9): flushReact(), link, mockHeartbeatsApi, mockInstanceSettingsApi, renderSidebar(), sidebarSlot, topSearchLink, workLinks (+1 more)
Community 520 - "Community 520"
Cohesion: 0.31 Nodes (9): buildAnchorFromContainerSelection(), buildRangesForRawSpan(), ContainerTextOffset, findAllOccurrences(), mapNormalizedOffsetToRaw(), matchRawLengthForNormalized(), pickClosestOccurrence(), rangesForNormalizedSpan() (+1 more)
Community 521 - "Community 521"
Cohesion: 0.29 Nodes (8): buildDuplicateAgentPayload(), cloneRecord(), duplicateAgentName(), DuplicateAgentSource, DuplicateInstructionsBundle, INSTRUCTION_CONFIG_KEYS, baseAgent, payload
Community 522 - "Community 522"
Cohesion: 0.40 Nodes (8): createIssueLinkNode(), linkifyIssueReferencesInText(), MarkdownNode, parseIssuePathIdFromPath(), parseIssueReferenceFromHref(), remarkLinkIssueReferences(), rewriteMarkdownTree(), splitTrailingPunctuation()
Community 523 - "Community 523"
Cohesion: 0.33 Nodes (5): BLOCK_MARKER_PATTERNS, looksLikeMarkdownPaste(), normalizePastedMarkdown(), normalizeMarkdown(), pasteNormalizationPlugin
Community 524 - "Community 524"
Cohesion: 0.24 Nodes (9): buildSoftBreakReplacement(), isParentNode(), MarkdownBreakNode, MarkdownNode, MarkdownParentNode, MarkdownTextNode, MarkdownTreeNode, remarkSoftBreaks() (+1 more)
Community 525 - "Community 525"
Cohesion: 0.38 Nodes (9): cost_events, finance_events, public.agents, public.companies, public.cost_events, public.goals, public.heartbeat_runs, public.issues (+1 more)
Community 526 - "Community 526"
Cohesion: 0.22 Nodes (6): declaration, flushReact(), link, mockPluginsApi, mockSetBreadcrumbs, renderSettings()
Community 527 - "Community 527"
Cohesion: 0.36 Nodes (7): nonEmpty(), normalizeApiUrl(), PaperclipMcpConfig, readConfigFromEnv(), stripTrailingSlash(), createPaperclipMcpServer(), runServer()
Community 528 - "Community 528"
Cohesion: 0.27 Nodes (7): calls, file, FetchLike, IngestSourceActionResult, readIngestOperationIssueId(), readUploadError(), uploadIssueAttachmentFile()
Community 529 - "Community 529"
Cohesion: 0.22 Nodes (9): { chromium }, __dirname, localRequire, main(), MIME, repoRoot, SHOTS, startStaticServer() (+1 more)
Community 530 - "Community 530"
Cohesion: 0.27 Nodes (7): dockerfilePath, extractDepsStage(), main(), parseCopySources(), parseWorkspaceRoots(), repoRoot, workspacePath
Community 531 - "Community 531"
Cohesion: 0.33 Nodes (7): CapturedOutput, createCapturedOutputBuffer(), normalizeByteLimit(), parseJsonResponseWithLimit(), capture, response, result
Community 532 - "Community 532"
Cohesion: 0.27 Nodes (9): buildHtml(), main(), OG_ORG, OrgNode, ORGS, renderNode(), renderTree(), StyleDef (+1 more)
Community 533 - "Community 533"
Cohesion: 0.20 Nodes (9): dependencies, __dirname, packageDir, packageJson, packageJsonPath, publishPackageJson, repoRoot, sdkPackageJson (+1 more)
Community 534 - "Community 534"
Cohesion: 0.38 Nodes (9): assert(), assertLocalSkillPackage(), createApiClient(), main(), parseArgs(), printUsage(), repoRoot, requireEnv() (+1 more)
Community 535 - "Community 535"
Cohesion: 0.42 Nodes (7): grantsForHumanRole(), HUMAN_COMPANY_MEMBERSHIP_ROLES, normalizeHumanRole(), resolveHumanInviteRole(), agentJoinGrantsFromDefaults(), grantsFromDefaults(), humanJoinGrantsFromDefaults()
Community 536 - "Community 536"
Cohesion: 0.20 Nodes (7): db, existingRow, interactionRow, mockCreateChild, SelectRow, state, svc
Community 537 - "Community 537"
Cohesion: 0.20 Nodes (5): companyBranding, invite, logoAsset, mockStorage, reusableJoinRequest
Community 538 - "Community 538"
Cohesion: 0.20 Nodes (8): cleanupDirs, customSkill, moduleDir, optionalDir, requiredDir, runtimeSkill, skillsHome, staleMaintainerSkill
Community 539 - "Community 539"
Cohesion: 0.22 Nodes (7): button, flushReact(), mockAccessApi, mockAuthApi, mockHealthApi, root, waitForText()
Community 540 - "Community 540"
Cohesion: 0.24 Nodes (10): addDAGNode(), generateTxId(), now, renderUzRegistry(), transferSelectedUE(), triggerOKBadgeGlow(), updateDAGVisual(), updateIndicatorRow() (+2 more)
Community 541 - "Community 541"
Cohesion: 0.24 Nodes (10): addDAGNode(), generateTxId(), now, renderUzRegistry(), transferSelectedUE(), triggerOKBadgeGlow(), updateDAGVisual(), updateIndicatorRow() (+2 more)
Community 542 - "Community 542"
Cohesion: 0.47 Nodes (8): dedupeModels(), fetchOpenAiModels(), fingerprint(), listCodexModels(), loadCodexModels(), mergedWithFallback(), refreshCodexModels(), resolveOpenAiApiKey()
Community 543 - "Community 543"
Cohesion: 0.50 Nodes (7): apply(), I18N, init(), load(), setLang(), strings(), t()
Community 544 - "Community 544"
Cohesion: 0.64 Nodes (5): calculateUEState(), canTransfer(), getSystemPhase(), getUETriggers(), RHYTHM
Community 545 - "Community 545"
Cohesion: 0.50 Nodes (7): autoCloseDuplicates(), closeIssueAsDuplicate(), extractDuplicateIssueNumber(), GitHubComment, GitHubIssue, GitHubReaction, githubRequest()
Community 546 - "Community 546"
Cohesion: 0.22 Nodes (8): BlockedReasonChip(), cases, chip, classy, dot, local, root, svg
Community 547 - "Community 547"
Cohesion: 0.22 Nodes (6): mockInstanceSettingsApi, mockSidebarBadgesApi, mockUsePluginSlots, queryClient, root, sidebarNavItemMock
Community 548 - "Community 548"
Cohesion: 0.36 Nodes (6): archive_summary, kons, participants, transactions, update_participants_updated_at, update_reputation_weight
Community 549 - "Community 549"
Cohesion: 0.25 Nodes (7): boardMember, createCompanyViaWizard(), ensureBootstrapped(), humanOption, inviteButton, nonOwner, roleSelect
Community 550 - "Community 550"
Cohesion: 0.42 Nodes (7): collapseDuplicatePendingHumanJoinRequests(), findReusableHumanJoinRequest(), humanJoinRequestIdentity(), JoinRequestLike, nonEmptyTrimmed(), normalizeJoinRequestEmail(), rows
Community 551 - "Community 551"
Cohesion: 0.31 Nodes (5): orderReusableExecutionWorkspaces(), ReusableExecutionWorkspaceLike, workspaces, WorkspaceWithUpdatedAt, workspaceLastUsedTime()
Community 552 - "Community 552"
Cohesion: 0.75 Nodes (8): plugin_llm_wiki_8f50da974f.paperclip_distillation_cursors, plugin_llm_wiki_8f50da974f.paperclip_distillation_runs, plugin_llm_wiki_8f50da974f.paperclip_distillation_work_items, plugin_llm_wiki_8f50da974f.paperclip_page_bindings, plugin_llm_wiki_8f50da974f.paperclip_source_snapshots, public.companies, public.issues, public.projects
Community 553 - "Community 553"
Cohesion: 0.42 Nodes (8): company_secret_bindings, company_secrets, public.companies, public.company_secrets, public.heartbeat_runs, public.issues, public.plugins, secret_access_events
Community 554 - "Community 554"
Cohesion: 0.25 Nodes (7): act(), flushReact(), mockAgentsApi, mockHeartbeatsApi, mockOpenNewAgent, mockResourceMembershipsApi, mockSetBreadcrumbs
Community 555 - "Community 555"
Cohesion: 0.22 Nodes (7): buildIssuesSearchUrl(), getNextIssuesPageOffset(), mergeIssuePagesStable(), duplicateFirst, first, second, third
Community 556 - "Community 556"
Cohesion: 0.22 Nodes (7): avatarInput, file, mockAssetsApi, mockAuthApi, mockSetBreadcrumbs, queryClient, root
Community 557 - "Community 557"
Cohesion: 0.36 Nodes (8): buildClaudePromptBundleKey(), ClaudePromptBundle, ensureReadableFile(), hashPathContents(), nonEmpty(), prepareClaudePromptBundle(), resolveManagedClaudePromptCacheRoot(), SkillEntry
Community 558 - "Community 558"
Cohesion: 0.42 Nodes (5): asRecord(), normalize(), readRepos(), readString(), sessionCodec
Community 559 - "Community 559"
Cohesion: 0.25 Nodes (7): agentPath, buildFakeAgentScript(), buildInstallSimulationCommand(), homeDir, remoteWorkspace, runner, workspace
Community 560 - "Community 560"
Cohesion: 0.42 Nodes (8): asPositiveInt(), main(), PartialConfig, readConfig(), resolveBackupDir(), resolveConnectionString(), resolveEmbeddedPort(), resolveRetentionDays()
Community 561 - "Community 561"
Cohesion: 0.33 Nodes (8): ensureJournalMatchesFiles(), ensureNoDuplicates(), ensureStrictlyOrdered(), JournalFile, journalPath, main(), migrationNumber(), migrationsDir
Community 562 - "Community 562"
Cohesion: 0.33 Nodes (6): authAccounts, authSessions, authUsers, authVerifications, boardApiKeys, cliAuthChallenges
Community 563 - "Community 563"
Cohesion: 0.22 Nodes (8): __dirname, linkTarget, packageDir, relativeSdkDir, repoRoot, scopeDir, sdkDir, stat
Community 564 - "Community 564"
Cohesion: 0.31 Nodes (8): ChallengeStatus, claimBoardOwnership(), ClaimChallenge, createChallenge(), getBoardClaimWarningUrl(), getChallengeStatus(), initializeBoardClaimChallenge(), inspectBoardClaimChallenge()
Community 565 - "Community 565"
Cohesion: 0.22 Nodes (6): db, invite, mockAccessService, mockAgentService, mockBoardAuthService, mockLogActivity
Community 566 - "Community 566"
Cohesion: 0.39 Nodes (8): describeLiveSsh, quotedRemoteWorkspacePath, readOptionalSecret(), resolveEnvLabStatePath(), resolveSshConfig(), startEnvLabForTest(), tryEnvLabFixture(), tryExplicitConfig()
Community 567 - "Community 567"
Cohesion: 0.22 Nodes (6): capture, capturePath, CapturePayload, commandPath, promptFlagIndex, workspace
Community 568 - "Community 568"
Cohesion: 0.31 Nodes (6): buildProcessConfig(), parseCommaArgs(), formatArgList(), ProcessConfigFields(), processUIAdapter, parseProcessStdoutLine()
Community 569 - "Community 569"
Cohesion: 0.28 Nodes (9): addDAGNode(), generateTxId(), now, renderUzRegistry(), transferSelectedUE(), updateDAGVisual(), updateIndicatorRow(), updateTransferButton() (+1 more)
Community 570 - "Community 570"
Cohesion: 0.22 Nodes (9): calculateInvestorStatuses(), initOrdersSVG(), joinDepartment(), joinOrder(), renderAllOrderStatuses(), renderDepartmentStatus(), renderOrderStatus(), renderStatuses() (+1 more)
Community 571 - "Community 571"
Cohesion: 0.22 Nodes (9): calculateInvestorStatuses(), initOrdersSVG(), joinDepartment(), joinOrder(), renderAllOrderStatuses(), renderDepartmentStatus(), renderOrderStatus(), renderStatuses() (+1 more)
Community 572 - "Community 572"
Cohesion: 0.22 Nodes (9): buildPageHref(), buildSectionHref(), buildSettingsSectionHref(), buildSpacePrefix(), buildWikiLinkHref(), normalizeWikiLinkPagePath(), routeSegmentsFromTreePath(), splitWikiLinkTarget() (+1 more)
Community 573 - "Community 573"
Cohesion: 0.39 Nodes (5): apply(), I18N, init(), load(), setLang()
Community 574 - "Community 574"
Cohesion: 0.39 Nodes (5): apply(), I18N, init(), load(), setLang()
Community 575 - "Community 575"
Cohesion: 0.39 Nodes (5): apply(), I18N, init(), load(), setLang()
Community 576 - "Community 576"
Cohesion: 0.39 Nodes (5): apply(), I18N, init(), load(), setLang()
Community 577 - "Community 577"
Cohesion: 0.39 Nodes (5): apply(), I18N, init(), load(), setLang()
Community 578 - "Community 578"
Cohesion: 0.39 Nodes (5): apply(), I18N, init(), load(), setLang()
Community 579 - "Community 579"
Cohesion: 0.39 Nodes (5): apply(), I18N, init(), load(), setLang()
Community 580 - "Community 580"
Cohesion: 0.50 Nodes (5): EMISSION_POLICY, getMaxUEPerDay(), getUENumbersByTriad(), isPredstoyatel(), validateTriadSelection()
Community 581 - "Community 581"
Cohesion: 0.43 Nodes (5): Canon, main(), { Pool }, TRIADS, validateDailyEmission()
Community 582 - "Community 582"
Cohesion: 0.25 Nodes (7): BlockedReasonChipProps, IconComponent, SEVERITY_DOT, VARIANT_ICONS, VARIANT_STYLES, BlockedReasonVariant, blockedVariantLabel()
Community 583 - "Community 583"
Cohesion: 0.25 Nodes (6): mockAuthApi, mockSetSidebarOpen, mockToggleTheme, queryClient, root, trigger
Community 584 - "Community 584"
Cohesion: 0.25 Nodes (6): button, onArchive, onClick, root, surface, wrapper
Community 585 - "Community 585"
Cohesion: 0.25 Nodes (7): __liveUpdatesTestUtils, cache, { getCommentMock }, invalidated, invalidations, queryClient, setCalls
Community 586 - "Community 586"
Cohesion: 0.36 Nodes (6): AgentSkillDraftState, AgentSkillSnapshotApplyResult, applyAgentSkillSnapshot(), arraysEqual(), isReadOnlyUnmanagedSkillEntry(), result
Community 587 - "Community 587"
Cohesion: 0.29 Nodes (5): buildIssuePropertiesPanelKey(), IssuePropertiesPanelKeyChild, IssuePropertiesPanelKeyIssue, first, second
Community 588 - "Community 588"
Cohesion: 0.32 Nodes (6): scheduleMainContentFocus(), shouldFocusMainContentAfterNavigation(), input, main, sidebarButton, staleButton
Community 589 - "Community 589"
Cohesion: 0.25 Nodes (3): featureWorkspace, primaryWorkspace, summaries
Community 590 - "Community 590"
Cohesion: 0.36 Nodes (4): buildSubIssueDefaults(), buildSubIssueDefaultsForViewer(), SubIssueDefaultSource, defaults
Community 591 - "Community 591"
Cohesion: 0.46 Nodes (6): isSuccessfulRunHandoffActivity(), isSuccessfulRunHandoffComment(), isSuccessfulRunHandoffEscalationComment(), readString(), successfulRunHandoffActivityTone(), successfulRunHandoffFromActivity()
Community 592 - "Community 592"
Cohesion: 0.46 Nodes (7): getWorktreeUiBranding(), hexToRgb(), normalizeHexColor(), pickReadableTextColor(), readMetaContent(), relativeLuminanceChannel(), WorktreeUiBranding
Community 593 - "Community 593"
Cohesion: 0.32 Nodes (6): normalizePath(), shouldSilenceHttpSuccessLog(), SILENCED_SUCCESS_API_PATHS, SILENCED_SUCCESS_METHODS, SILENCED_SUCCESS_STATIC_PATHS, SILENCED_SUCCESS_STATIC_PREFIXES
Community 594 - "Community 594"
Cohesion: 0.50 Nodes (7): agent_runtime_state, agent_wakeup_requests, heartbeat_run_events, heartbeat_runs, public.agents, public.companies, public.heartbeat_runs
Community 595 - "Community 595"
Cohesion: 0.46 Nodes (7): assets, issue_attachments, public.agents, public.assets, public.companies, public.issue_comments, public.issues
Community 596 - "Community 596"
Cohesion: 0.46 Nodes (7): public.agents, public.companies, public.heartbeat_runs, public.issues, public.project_workspaces, public.projects, workspace_runtime_services
Community 597 - "Community 597"
Cohesion: 0.54 Nodes (7): document_revisions, documents, issue_documents, public.agents, public.companies, public.documents, public.issues
Community 598 - "Community 598"
Cohesion: 0.46 Nodes (7): environment_leases, environments, public.companies, public.environments, public.execution_workspaces, public.heartbeat_runs, public.issues
Community 599 - "Community 599"
Cohesion: 0.57 Nodes (7): issue_tree_hold_members, issue_tree_holds, public.agents, public.companies, public.heartbeat_runs, public.issue_tree_holds, public.issues
Community 600 - "Community 600"
Cohesion: 0.43 Nodes (7): public.agents, public.companies, public.heartbeat_runs, public.routine_revisions, public.routines, routine_revisions, routines
Community 601 - "Community 601"
Cohesion: 0.46 Nodes (7): issue_plan_decompositions, public.agents, public.companies, public.document_revisions, public.heartbeat_runs, public.issue_thread_interactions, public.issues
Community 602 - "Community 602"
Cohesion: 0.25 Nodes (4): DashboardWidget(), HealthData, SettingsPage(), SurfaceStatus
Community 603 - "Community 603"
Cohesion: 0.25 Nodes (5): AsciiArtAnimation(), CHARS, Clip, PAPERCLIP_SPRITES, PaperclipSprite
Community 604 - "Community 604"
Cohesion: 0.32 Nodes (6): ensureWorkspaceLinksCurrent(), findWorkspaceLinkMismatches(), readJsonFile(), workspaceDirs, WorkspaceLinkMismatch, workspacePackagePaths
Community 605 - "Community 605"
Cohesion: 0.25 Nodes (6): cleanupDirs, companyId, mockListSkills, skillId, tracked, trackedSvc
Community 606 - "Community 606"
Cohesion: 0.25 Nodes (7): cleanupDirs, companyId, entry, listedSkill, missingSkillDir, skill, skillId
Community 607 - "Community 607"
Cohesion: 0.25 Nodes (5): cleanupDirs, existingTarget, injectedA, injectedB, logs
Community 608 - "Community 608"
Cohesion: 0.25 Nodes (7): BASE_PARAMS, driver, errorEvent, execs, FAKE_MANIFEST, harness, realize
Community 609 - "Community 609"
Cohesion: 0.25 Nodes (5): args, argsCapturePath, binDir, cwd, root
Community 610 - "Community 610"
Cohesion: 0.25 Nodes (3): cases, lookup, requestHead
Community 611 - "Community 611"
Cohesion: 0.25 Nodes (7): agents, baseIssue, exhausted, findings, incidentKey, input, overdue
Community 612 - "Community 612"
Cohesion: 0.25 Nodes (7): addr, listeningAddress, require, SupertestServer, SupertestTest, SupertestTestConstructor, SupertestTestInstance
Community 613 - "Community 613"
Cohesion: 0.39 Nodes (5): apply(), I18N, init(), load(), setLang()
Community 614 - "Community 614"
Cohesion: 0.32 Nodes (8): consentUrlFromDiscovery(), numberField(), objectField(), optionalNumber(), scopesFromDiscovery(), stringField(), targetFromDiscovery(), tokenUrlFromDiscovery()
Community 615 - "Community 615"
Cohesion: 0.43 Nodes (8): derivePersistedMonitorState(), isoString(), monitorMetadataFromPolicy(), monitorMetadataFromState(), normalizeIssueExecutionPolicy(), normalizeMonitorNotes(), normalizeMonitorText(), redactIssueMonitorExternalRef()
Community 616 - "Community 616"
Cohesion: 0.62 Nodes (5): calculateUEState(), canTransfer(), getSystemPhase(), getUETriggers(), RHYTHM
Community 617 - "Community 617"
Cohesion: 0.52 Nodes (5): Grammar, { Pool }, runTest(), sleep(), TEST_OKS
Community 618 - "Community 618"
Cohesion: 0.43 Nodes (6): get(), http, main(), { Pool }, post(), sleep()
Community 619 - "Community 619"
Cohesion: 0.62 Nodes (5): backfillDuplicateComments(), GitHubComment, GitHubIssue, githubRequest(), triggerDedupeWorkflow()
Community 620 - "Community 620"
Cohesion: 0.29 Nodes (6): __dirname, externals, externalWorkspacePackages, pkg, repoRoot, workspacePaths
Community 621 - "Community 621"
Cohesion: 0.29 Nodes (7): copySeededSecretsKey(), isCurrentSourceConfigPath(), pauseSeededScheduledRoutines(), quarantineSeededWorktreeExecutionState(), rebindSeededProjectWorkspaces(), rebindWorkspaceCwd(), seedWorktreeDatabase()
Community 622 - "Community 622"
Cohesion: 0.43 Nodes (3): main(), PygmalionMetrics, Запуск экспортера метрик
Community 623 - "Community 623"
Cohesion: 0.38 Nodes (4): buildHttpConfig(), HttpConfigFields(), httpUIAdapter, parseHttpStdoutLine()
Community 624 - "Community 624"
Cohesion: 0.48 Nodes (5): buildInitialExportCheckedFiles(), buildRecurringTaskPrefixes(), isRecurringTaskFile(), isTaskPath(), checked
Community 625 - "Community 625"
Cohesion: 0.48 Nodes (4): buildOnboardingIssuePayload(), buildOnboardingProjectPayload(), pickEarliestGoal(), selectDefaultCompanyGoalId()
Community 626 - "Community 626"
Cohesion: 0.29 Nodes (3): issueBRuns, queryClient, root
Community 627 - "Community 627"
Cohesion: 0.43 Nodes (4): getWorkspaceSpecificRoutineVariableNames(), routineHasWorkspaceSpecificVariables(), routine, WORKSPACE_SPECIFIC_ROUTINE_VARIABLES
Community 628 - "Community 628"
Cohesion: 0.57 Nodes (6): agent_config_revisions, issue_approvals, public.agents, public.approvals, public.companies, public.issues
Community 629 - "Community 629"
Cohesion: 0.48 Nodes (6): agents, budget_incidents, budget_policies, public.approvals, public.budget_policies, public.companies
Community 630 - "Community 630"
Cohesion: 0.48 Nodes (6): board_api_keys, cli_auth_challenges, instance_settings, public.board_api_keys, public.companies, public.user
Community 631 - "Community 631"
Cohesion: 0.48 Nodes (6): heartbeat_runs, issue_execution_decisions, public.agents, public.companies, public.heartbeat_runs, public.issues
Community 632 - "Community 632"
Cohesion: 0.52 Nodes (6): issue_thread_interactions, public.agents, public.companies, public.heartbeat_runs, public.issue_comments, public.issues
Community 633 - "Community 633"
Cohesion: 0.48 Nodes (6): heartbeat_run_watchdog_decisions, heartbeat_runs, public.agents, public.companies, public.heartbeat_runs, public.issues
Community 634 - "Community 634"
Cohesion: 0.29 Nodes (3): events, port, server
Community 635 - "Community 635"
Cohesion: 0.33 Nodes (5): flushReact(), mockParams, mockPluginsApi, mockSetBreadcrumbs, renderPage()
Community 636 - "Community 636"
Cohesion: 0.33 Nodes (6): COMMAND_CLI_SECRET_OPTION_RE, COMMAND_ENV_SECRET_ASSIGNMENT_RE, COMMAND_SECRET_HINTS, maybeContainsSecretText(), redactCommandText(), SECRET_NAME_PATTERN
Community 637 - "Community 637"
Cohesion: 0.29 Nodes (6): CommandExitError, Sandbox, SandboxBackgroundHandle, SandboxNotFoundError, SandboxRunResult, TimeoutError
Community 638 - "Community 638"
Cohesion: 0.48 Nodes (6): getBridgeRegistry(), getSdkUiRuntimeValue(), GlobalBridge, missingBridgeValueError(), PluginBridgeRegistry, renderSdkUiComponent()
Community 639 - "Community 639"
Cohesion: 0.29 Nodes (6): __dirname, packageJson, packageJsonPath, publishPackageJson, repoRoot, uiDir
Community 640 - "Community 640"
Cohesion: 0.29 Nodes (5): baseUrl, startedAt, target, virtualCount, virtualizer
Community 641 - "Community 641"
Cohesion: 0.29 Nodes (6): binDir, codexHome, cwd, fakeCodex, root, script
Community 642 - "Community 642"
Cohesion: 0.29 Nodes (3): cleanupDirs, logs, staleTarget
Community 643 - "Community 643"
Cohesion: 0.29 Nodes (4): cleanupDirs, clearedCtx, configuredCtx, ctx
Community 644 - "Community 644"
Cohesion: 0.29 Nodes (3): app, invite, mockStorage
Community 645 - "Community 645"
Cohesion: 0.29 Nodes (3): config, logs, payload
Community 646 - "Community 646"
Cohesion: 0.29 Nodes (7): buildCanonicalRecord(), colorizeOK(), formatTransactionRecord(), getCorrectLength(), maskTemporaryKey(), normalizeOK(), updateOKBadge()
Community 647 - "Community 647"
Cohesion: 0.29 Nodes (7): buildCanonicalRecord(), colorizeOK(), formatTransactionRecord(), getCorrectLength(), maskTemporaryKey(), normalizeOK(), updateOKBadge()
Community 648 - "Community 648"
Cohesion: 0.33 Nodes (7): formatCommentEventSource(), formatDocumentEventSource(), formatIssueEventSource(), protectDistillationSourceBody(), redactDistillationSensitiveText(), sourceTitleForIssue(), truncateEventSource()
Community 649 - "Community 649"
Cohesion: 0.53 Nodes (5): calculateUEState(), canTransfer(), getSystemPhase(), getUETriggers(), RHYTHM
Community 650 - "Community 650"
Cohesion: 0.53 Nodes (5): calculateUEState(), canTransfer(), getSystemPhase(), getUETriggers(), RHYTHM
Community 651 - "Community 651"
Cohesion: 0.53 Nodes (5): calculateUEState(), canTransfer(), getSystemPhase(), getUETriggers(), RHYTHM
Community 652 - "Community 652"
Cohesion: 0.53 Nodes (5): calculateUEState(), canTransfer(), getSystemPhase(), getUETriggers(), RHYTHM
Community 653 - "Community 653"
Cohesion: 0.53 Nodes (5): calculateUEState(), canTransfer(), getSystemPhase(), getUETriggers(), RHYTHM
Community 654 - "Community 654"
Cohesion: 0.53 Nodes (5): calculateUEState(), canTransfer(), getSystemPhase(), getUETriggers(), RHYTHM
Community 655 - "Community 655"
Cohesion: 0.53 Nodes (5): calculateUEState(), canTransfer(), getSystemPhase(), getUETriggers(), RHYTHM
Community 656 - "Community 656"
Cohesion: 0.53 Nodes (5): calculateUEState(), canTransfer(), getSystemPhase(), getUETriggers(), RHYTHM
Community 657 - "Community 657"
Cohesion: 0.53 Nodes (5): calculateUEState(), canTransfer(), getSystemPhase(), getUETriggers(), RHYTHM
Community 658 - "Community 658"
Cohesion: 0.53 Nodes (5): calculateUEState(), canTransfer(), getSystemPhase(), getUETriggers(), RHYTHM
Community 659 - "Community 659"
Cohesion: 0.53 Nodes (5): calculateUEState(), canTransfer(), getSystemPhase(), getUETriggers(), RHYTHM
Community 660 - "Community 660"
Cohesion: 0.53 Nodes (5): calculateUEState(), canTransfer(), getSystemPhase(), getUETriggers(), RHYTHM
Community 661 - "Community 661"
Cohesion: 0.53 Nodes (5): calculateUEState(), canTransfer(), getSystemPhase(), getUETriggers(), RHYTHM
Community 662 - "Community 662"
Cohesion: 0.53 Nodes (5): calculateUEState(), canTransfer(), getSystemPhase(), getUETriggers(), RHYTHM
Community 663 - "Community 663"
Cohesion: 0.53 Nodes (5): calculateUEState(), canTransfer(), getSystemPhase(), getUETriggers(), RHYTHM
Community 664 - "Community 664"
Cohesion: 0.53 Nodes (5): calculateUEState(), canTransfer(), getSystemPhase(), getUETriggers(), RHYTHM
Community 665 - "Community 665"
Cohesion: 0.67 Nodes (4): emitUE(), main(), { Pool }, transferUE()
Community 666 - "Community 666"
Cohesion: 0.60 Nodes (3): interval, observations, observe()
Community 667 - "Community 667"
Cohesion: 0.40 Nodes (4): act(), onLeave, parentClick, renderAction()
Community 668 - "Community 668"
Cohesion: 0.47 Nodes (4): buildDocumentAnnotationHash(), DocumentAnnotationHashTarget, parseDocumentAnnotationHash(), target
Community 669 - "Community 669"
Cohesion: 0.67 Nodes (4): isOnboardingPath(), OnboardingRouteCompany, resolveRouteOnboardingOptions(), shouldRedirectCompanylessRouteToOnboarding()
Community 670 - "Community 670"
Cohesion: 0.80 Nodes (5): clearRecentSearches(), isStorageAvailable(), loadRecentSearches(), pushRecentSearch(), storageKey()
Community 671 - "Community 671"
Cohesion: 0.40 Nodes (3): buildRoutineTriggerPatch(), RoutineTriggerEditorDraft, patch
Community 672 - "Community 672"
Cohesion: 0.53 Nodes (3): createUiDevWatchOptions(), shouldIgnoreUiDevWatchPath(), TEST_DIRECTORY_NAMES
Community 673 - "Community 673"
Cohesion: 0.60 Nodes (4): BrowserLocationLike, browserReachableHost(), buildSameOriginWebSocketUrl(), isWildcardHost()
Community 674 - "Community 674"
Cohesion: 0.53 Nodes (5): agents, approval_comments, public.agents, public.approvals, public.companies
Community 675 - "Community 675"
Cohesion: 0.60 Nodes (5): company_secret_versions, company_secrets, public.agents, public.companies, public.company_secrets
Community 676 - "Community 676"
Cohesion: 0.60 Nodes (5): issue_labels, labels, public.companies, public.issues, public.labels
Community 677 - "Community 677"
Cohesion: 0.60 Nodes (5): agent_memberships, project_memberships, public.agents, public.companies, public.projects
Community 678 - "Community 678"
Cohesion: 0.40 Nodes (5): flushReact(), mockParams, mockSetBreadcrumbs, mockUsePluginSlots, renderPage()
Community 679 - "Community 679"
Cohesion: 0.47 Nodes (3): assets, companyLogos, issueAttachments
Community 680 - "Community 680"
Cohesion: 0.60 Nodes (3): __dirname, __filename, packageRoot
Community 681 - "Community 681"
Cohesion: 0.40 Nodes (5): COMPANY_SEARCH_SCOPES, clampInteger(), CompanySearchQuery, companySearchQuerySchema, firstQueryValue()
Community 682 - "Community 682"
Cohesion: 0.33 Nodes (5): playwrightPkgRoot, repoRoot, stories, target, themes
Community 683 - "Community 683"
Cohesion: 0.53 Nodes (5): asCatalogString(), isCatalogRecord(), PORTABLE_CATALOG_PROVENANCE_STRING_KEYS, readCatalogStringList(), readPortableCatalogProvenance()
Community 684 - "Community 684"
Cohesion: 0.40 Nodes (3): baseUser, createApp(), createDb()
Community 685 - "Community 685"
Cohesion: 0.33 Nodes (4): lines, parsed, spy, stdout
Community 686 - "Community 686"
Cohesion: 0.33 Nodes (4): lines, parsed, spy, stdout
Community 687 - "Community 687"
Cohesion: 0.33 Nodes (4): cleanupDirs, clearedCtx, configuredCtx, ctx
Community 688 - "Community 688"
Cohesion: 0.33 Nodes (5): cwd, fakeOpencode, missingCheck, modelCheck, script
Community 689 - "Community 689"
Cohesion: 0.33 Nodes (4): lines, parsed, spy, stdout
Community 690 - "Community 690"
Cohesion: 0.33 Nodes (4): cleanupDirs, clearedCtx, configuredCtx, ctx
Community 691 - "Community 691"
Cohesion: 0.33 Nodes (4): binDir, cwd, root, stalePackageCheck
Community 692 - "Community 692"
Cohesion: 0.33 Nodes (4): cleanupDirs, clearedCtx, configuredCtx, ctx
Community 693 - "Community 693"
Cohesion: 0.53 Nodes (5): calculateUEState(), canTransfer(), getSystemPhase(), getUETriggers(), RHYTHM
Community 694 - "Community 694"
Cohesion: 0.47 Nodes (6): initDeptChat(), initTestMessagesForDept0(), loadDeptChats(), renderDeptChatMessages(), saveDeptChats(), sendDeptChatMessage()
Community 695 - "Community 695"
Cohesion: 0.47 Nodes (6): initDeptChat(), initTestMessagesForDept0(), loadDeptChats(), renderDeptChatMessages(), saveDeptChats(), sendDeptChatMessage()
Community 696 - "Community 696"
Cohesion: 0.33 Nodes (6): calculateInvestorStatuses(), getDepartmentName(), joinDepartment(), renderDepartmentStatus(), renderStatuses(), updateStatuses()
Community 697 - "Community 697"
Cohesion: 0.47 Nodes (6): initDeptChat(), initTestMessagesForDept0(), loadDeptChats(), renderDeptChatMessages(), saveDeptChats(), sendDeptChatMessage()
Community 698 - "Community 698"
Cohesion: 0.47 Nodes (6): initDeptChat(), initTestMessagesForDept0(), loadDeptChats(), renderDeptChatMessages(), saveDeptChats(), sendDeptChatMessage()
Community 699 - "Community 699"
Cohesion: 0.33 Nodes (6): buildLocalChunks(), buildLocalUpstreamExportBundle(), canonicalJson(), countEntityTypesForManifest(), normalizedContentHash(), sortJson()
Community 700 - "Community 700"
Cohesion: 0.53 Nodes (6): parseFrontmatterValue(), parseWikiFrontmatterBlock(), parseWikiMarkdown(), parseYamlInlineArray(), stripYamlInlineComment(), unquoteYamlScalar()
Community 701 - "Community 701"
Cohesion: 0.60 Nodes (2): content, reserve
Community 702 - "Community 702"
Cohesion: 0.70 Nodes (3): main(), { Pool }, transferUE()
Community 703 - "Community 703"
Cohesion: 0.50 Nodes (3): api(), http, main()
Community 704 - "Community 704"
Cohesion: 0.60 Nodes (2): printClaudeStreamEvent(), printToolResult()
Community 705 - "Community 705"
Cohesion: 0.40 Nodes (1): IssueChatErrorBoundary
Community 706 - "Community 706"
Cohesion: 0.60 Nodes (4): AgentOnboardingPromptInput, buildAgentOnboardingPrompt(), buildCandidateOnboardingUrls(), buildResolutionTestUrl()
Community 707 - "Community 707"
Cohesion: 0.50 Nodes (5): approvalActivityTimestamp(), isInboxEntityDismissed(), issueLastActivityTimestamp(), normalizeTimestamp(), sortIssuesByMostRecentActivity()
Community 708 - "Community 708"
Cohesion: 0.60 Nodes (5): getInboxFilterPreferencesStorageKey(), loadInboxFilterPreferences(), normalizeInboxApprovalFilter(), normalizeInboxCategoryFilter(), saveInboxFilterPreferences()
Community 709 - "Community 709"
Cohesion: 0.80 Nodes (3): asNonEmptyString(), hasLegacyWorkingDirectory(), shouldShowLegacyWorkingDirectoryField()
Community 710 - "Community 710"
Cohesion: 0.70 Nodes (4): agent_task_sessions, public.agents, public.companies, public.heartbeat_runs
Community 711 - "Community 711"
Cohesion: 0.70 Nodes (4): project_goals, public.companies, public.goals, public.projects
Community 712 - "Community 712"
Cohesion: 0.70 Nodes (4): public.companies, public.execution_workspaces, public.heartbeat_runs, workspace_operations
Community 713 - "Community 713"
Cohesion: 0.70 Nodes (4): issue_relations, public.agents, public.companies, public.issues
Community 714 - "Community 714"
Cohesion: 0.70 Nodes (4): issue_recovery_actions, public.agents, public.companies, public.issues
Community 715 - "Community 715"
Cohesion: 0.70 Nodes (4): cloud_upstream_connections, cloud_upstream_runs, public.cloud_upstream_connections, public.companies
Community 716 - "Community 716"
Cohesion: 0.70 Nodes (4): createInviteToken(), hashToken(), main(), readArg()
Community 717 - "Community 717"
Cohesion: 0.40 Nodes (4): CLOSED_EXECUTION_WORKSPACE_STATUSES, ExecutionWorkspaceGuardTarget, getClosedIsolatedExecutionWorkspaceMessage(), isClosedIsolatedExecutionWorkspace()
Community 718 - "Community 718"
Cohesion: 0.70 Nodes (4): deriveProjectUrlKey(), hasNonAsciiContent(), normalizeProjectUrlKey(), shortIdFromUuid()
Community 719 - "Community 719"
Cohesion: 0.50 Nodes (3): ignoredTestConfigBasenames, shouldTrackDevServerPath(), testDirectoryNames
Community 720 - "Community 720"
Cohesion: 0.50 Nodes (3): claimFirstInstanceAdmin(), FirstAdminClaimResult, FirstAdminTransaction
Community 721 - "Community 721"
Cohesion: 0.40 Nodes (2): customScope, Db
Community 722 - "Community 722"
Cohesion: 0.40 Nodes (3): claudeConfigDir, codexHome, root
Community 723 - "Community 723"
Cohesion: 0.40 Nodes (4): codes, cwd, executeCalls, probeCall
Community 724 - "Community 724"
Cohesion: 0.40 Nodes (3): cleanupDirs, configuredCtx, ctx
Community 725 - "Community 725"
Cohesion: 0.40 Nodes (3): parsed, spy, stdout
Community 726 - "Community 726"
Cohesion: 0.50 Nodes (3): createApp(), createDbStub(), logActivityMock
Community 727 - "Community 727"
Cohesion: 0.40 Nodes (5): activateImpulseUE(), initTransfer(), setupIndicatorClicks(), updateIndicatorRow(), updateUEIndicatorsFromState()
Community 728 - "Community 728"
Cohesion: 0.50 Nodes (1): chars
Community 729 - "Community 729"
Cohesion: 0.67 Nodes (2): main(), { Pool }
Community 730 - "Community 730"
Cohesion: 0.67 Nodes (3): api(), http, main()
Community 731 - "Community 731"
Cohesion: 0.67 Nodes (3): main(), { Pool }, transferUE()
Community 732 - "Community 732"
Cohesion: 0.67 Nodes (3): api(), http, main()
Community 733 - "Community 733"
Cohesion: 0.83 Nodes (2): main(), _validate_command()
Community 734 - "Community 734"
Cohesion: 0.50 Nodes (3): html, manifest, uiRoot
Community 735 - "Community 735"
Cohesion: 0.83 Nodes (3): project_workspaces, public.companies, public.projects
Community 736 - "Community 736"
Cohesion: 0.83 Nodes (3): issue_read_states, public.companies, public.issues
Community 737 - "Community 737"
Cohesion: 0.83 Nodes (3): company_logos, public.assets, public.companies
Community 738 - "Community 738"
Cohesion: 0.83 Nodes (3): issue_inbox_archives, public.companies, public.issues
Community 739 - "Community 739"
Cohesion: 0.67 Nodes (3): company_user_sidebar_preferences, public.companies, user_sidebar_preferences
Community 740 - "Community 740"
Cohesion: 0.83 Nodes (3): plugin_database_namespaces, plugin_migrations, public.plugins
Community 741 - "Community 741"
Cohesion: 0.83 Nodes (3): issue_reference_mentions, public.companies, public.issues
Community 742 - "Community 742"
Cohesion: 0.83 Nodes (3): plugin_managed_resources, public.companies, public.plugins
Community 743 - "Community 743"
Cohesion: 0.83 Nodes (3): execution_workspaces, public.companies, workspace_operations
Community 744 - "Community 744"
Cohesion: 0.67 Nodes (2): feedbackExports, feedbackVotes
Community 745 - "Community 745"
Cohesion: 0.67 Nodes (3): formatErrorResponse(), formatTextResponse(), McpTextResponse
Community 746 - "Community 746"
Cohesion: 0.50 Nodes (3): container, App(), useView()
Community 747 - "Community 747"
Cohesion: 0.83 Nodes (3): api(), load_env(), main()
Community 748 - "Community 748"
Cohesion: 0.50 Nodes (2): lines, spy
Community 749 - "Community 749"
Cohesion: 0.50 Nodes (1): cleanupDirs
Community 750 - "Community 750"
Cohesion: 0.50 Nodes (1): LauncherErrorBoundary
Community 751 - "Community 751"
Cohesion: 0.50 Nodes (1): PluginSlotErrorBoundary
Community 752 - "Community 752"
Cohesion: 0.67 Nodes (4): loadDeptChats(), renderDeptChatMessages(), saveDeptChats(), sendDeptChatMessage()
Community 753 - "Community 753"
Cohesion: 0.67 Nodes (4): loadOrderChats(), renderOrderChatMessages(), saveOrderChats(), sendOrderChatMessage()
Community 754 - "Community 754"
Cohesion: 0.67 Nodes (4): loadOrderChats(), renderOrderChatMessages(), saveOrderChats(), sendOrderChatMessage()
Community 755 - "Community 755"
Cohesion: 0.67 Nodes (4): loadOrderChats(), renderOrderChatMessages(), saveOrderChats(), sendOrderChatMessage()
Community 756 - "Community 756"
Cohesion: 0.50 Nodes (4): hasEmittedThisPeriod(), isNewPeriodSince(), isTriadAvailable(), updateTriadButtons()
Community 757 - "Community 757"
Cohesion: 0.50 Nodes (1): FakeWebSocket
Community 758 - "Community 758"
Cohesion: 0.67 Nodes (1): { Pool }
Community 759 - "Community 759"
Cohesion: 1.00 Nodes (1): printOpenClawGatewayStreamEvent()
Community 760 - "Community 760"
Cohesion: 0.67 Nodes (2): PAPERCLIP_HOME, PORT
Community 761 - "Community 761"
Cohesion: 0.67 Nodes (3): buildGroupedInboxSections(), groupInboxWorkItems(), groupInboxWorkItemsByIssueGroup()
Community 762 - "Community 762"
Cohesion: 0.67 Nodes (3): getInboxCollapsedGroupsStorageKey(), loadCollapsedInboxGroupKeys(), saveCollapsedInboxGroupKeys()
Community 763 - "Community 763"
Cohesion: 0.67 Nodes (3): loadInboxIssueColumns(), normalizeInboxIssueColumns(), saveInboxIssueColumns()
Community 764 - "Community 764"
Cohesion: 1.00 Nodes (2): heartbeat_runs, public.agent_wakeup_requests
Community 765 - "Community 765"
Cohesion: 1.00 Nodes (2): activity_log, public.heartbeat_runs
Community 766 - "Community 766"
Cohesion: 1.00 Nodes (2): plugin_orchestration_smoke_1e8c264c64.smoke_runs, public.issues
Community 767 - "Community 767"
Cohesion: 1.00 Nodes (2): issues, public.heartbeat_runs
Community 768 - "Community 768"
Cohesion: 1.00 Nodes (2): issues, public.heartbeat_runs
Community 769 - "Community 769"
Cohesion: 1.00 Nodes (2): heartbeat_runs, public.heartbeat_runs
Community 770 - "Community 770"
Cohesion: 1.00 Nodes (2): company_skills, public.companies
Community 771 - "Community 771"
Cohesion: 1.00 Nodes (2): inbox_dismissals, public.companies
Community 772 - "Community 772"
Cohesion: 1.00 Nodes (2): agents, public.environments
Community 773 - "Community 773"
Cohesion: 1.00 Nodes (2): documents, public.agents
Community 774 - "Community 774"
Cohesion: 1.00 Nodes (2): public.routine_revisions, routines
Community 775 - "Community 775"
Cohesion: 1.00 Nodes (2): resolveRuntimeLikePath(), unique()
Community 776 - "Community 776"
Cohesion: 0.67 Nodes (2): presets, watch
Community 777 - "Community 777"
Cohesion: 0.67 Nodes (1): presets
Community 778 - "Community 778"
Cohesion: 0.67 Nodes (2): presets, watch
Community 779 - "Community 779"
Cohesion: 0.67 Nodes (1): presets
Community 780 - "Community 780"
Cohesion: 0.67 Nodes (2): presets, watch
Community 781 - "Community 781"
Cohesion: 0.67 Nodes (1): presets
Community 782 - "Community 782"
Cohesion: 0.67 Nodes (2): parsed, serialized
Community 783 - "Community 783"
Cohesion: 0.67 Nodes (1): { app, getCallCount }
Community 784 - "Community 784"
Cohesion: 0.67 Nodes (2): harness, manifest
Community 785 - "Community 785"
Cohesion: 0.67 Nodes (1): client
Community 786 - "Community 786"
Cohesion: 0.67 Nodes (2): clone, url
Community 787 - "Community 787"
Cohesion: 0.67 Nodes (1): storageEntries
Community 788 - "Community 788"
Cohesion: 0.67 Nodes (3): hasEmittedThisPeriod(), isNewPeriodSince(), isTriadAvailable()
Community 789 - "Community 789"
Cohesion: 0.67 Nodes (3): hasEmittedThisPeriod(), isNewPeriodSince(), isTriadAvailable()
Community 790 - "Community 790"
Cohesion: 0.67 Nodes (3): renderFlowerVisual(), updateDomainsFromDAR(), updatePetalHoverEffects()
Community 791 - "Community 791"
Cohesion: 1.00 Nodes (3): extractWikiTocHeadings(), slugifyWikiHeading(), stripMarkdownHeadingSyntax()
Community 792 - "Community 792"
Cohesion: 1.00 Nodes (3): formatSourceRef(), readSourceRefField(), sourceRefIdentity()
Community 793 - "Community 793"
Cohesion: 0.67 Nodes (3): PaperclipIngestionSpaceCard(), paperclipIngestionStateBadge(), usePaperclipIngestionProfile()
Community 794 - "Community 794"
Cohesion: 1.00 Nodes (1): ue_units
Community 795 - "Community 795"
Cohesion: 1.00 Nodes (2): flush(), waitForAssertion()
Community 796 - "Community 796"
Cohesion: 1.00 Nodes (1): PORT
Community 797 - "Community 797"
Cohesion: 1.00 Nodes (1): PORT
Community 798 - "Community 798"
Cohesion: 1.00 Nodes (2): buildInboxKeyboardNavEntries(), getInboxWorkItemKey()
Community 799 - "Community 799"
Cohesion: 1.00 Nodes (2): matchesInboxIssueSearch(), resolveIssueWorkspaceName()
Community 800 - "Community 800"
Cohesion: 1.00 Nodes (1): instance_settings
Community 801 - "Community 801"
Cohesion: 1.00 Nodes (2): flushReact(), waitForAssertion()
Community 804 - "Community 804"
Cohesion: 1.00 Nodes (1): runs
Community 805 - "Community 805"
Cohesion: 1.00 Nodes (1): runs
Community 806 - "Community 806"
Cohesion: 1.00 Nodes (1): result
Community 807 - "Community 807"
Cohesion: 1.00 Nodes (1): Request
Community 808 - "Community 808"
Cohesion: 1.00 Nodes (2): dataResolver(), fakeData()
Community 809 - "Community 809"
Cohesion: 1.00 Nodes (2): AgentAvatar(), agentAvatarGlyph()
Community 810 - "Community 810"
Cohesion: 1.00 Nodes (2): FolderHealthChecklist(), folderHealthItems()
Community 811 - "Community 811"
Cohesion: 1.00 Nodes (2): managedResourceKey(), skillLabel()
Community 812 - "Community 812"
Cohesion: 1.00 Nodes (2): SpaceEditCard(), useSpaceFolderStatus()
Community 830 - "Community 830"
Cohesion: 1.00 Nodes (1): Create Condition from dict.
Community 831 - "Community 831"
Cohesion: 1.00 Nodes (1): Create Rule from frontmatter dict and message body.
Knowledge Gaps
6998 isolated node(s): report, sep, paths, i18nElements, current (+6993 more) These have ≤1 connection - possible missing edges or undocumented components.
Thin community Community 415 (1 nodes): I18n Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 701 (2 nodes): content, reserve Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 704 (2 nodes): printClaudeStreamEvent(), printToolResult() Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 705 (1 nodes): IssueChatErrorBoundary Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 721 (2 nodes): customScope, Db Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 728 (1 nodes): chars Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 729 (2 nodes): main(), { Pool } Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 733 (2 nodes): main(), _validate_command() Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 744 (2 nodes): feedbackExports, feedbackVotes Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 748 (2 nodes): lines, spy Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 749 (1 nodes): cleanupDirs Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 750 (1 nodes): LauncherErrorBoundary Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 751 (1 nodes): PluginSlotErrorBoundary Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 757 (1 nodes): FakeWebSocket Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 758 (1 nodes): { Pool } Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 759 (1 nodes): printOpenClawGatewayStreamEvent() Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 760 (2 nodes): PAPERCLIP_HOME, PORT Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 764 (2 nodes): heartbeat_runs, public.agent_wakeup_requests Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 765 (2 nodes): activity_log, public.heartbeat_runs Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 766 (2 nodes): plugin_orchestration_smoke_1e8c264c64.smoke_runs, public.issues Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 767 (2 nodes): issues, public.heartbeat_runs Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 768 (2 nodes): issues, public.heartbeat_runs Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 769 (2 nodes): heartbeat_runs, public.heartbeat_runs Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 770 (2 nodes): company_skills, public.companies Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 771 (2 nodes): inbox_dismissals, public.companies Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 772 (2 nodes): agents, public.environments Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 773 (2 nodes): documents, public.agents Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 774 (2 nodes): public.routine_revisions, routines Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 775 (2 nodes): resolveRuntimeLikePath(), unique() Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 776 (2 nodes): presets, watch Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 777 (1 nodes): presets Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 778 (2 nodes): presets, watch Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 779 (1 nodes): presets Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 780 (2 nodes): presets, watch Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 781 (1 nodes): presets Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 782 (2 nodes): parsed, serialized Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 783 (1 nodes): { app, getCallCount } Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 784 (2 nodes): harness, manifest Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 785 (1 nodes): client Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 786 (2 nodes): clone, url Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 787 (1 nodes): storageEntries Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 794 (1 nodes): ue_units Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 795 (2 nodes): flush(), waitForAssertion() Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 796 (1 nodes): PORT Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 797 (1 nodes): PORT Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 798 (2 nodes): buildInboxKeyboardNavEntries(), getInboxWorkItemKey() Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 799 (2 nodes): matchesInboxIssueSearch(), resolveIssueWorkspaceName() Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 800 (1 nodes): instance_settings Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 801 (2 nodes): flushReact(), waitForAssertion() Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 804 (1 nodes): runs Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 805 (1 nodes): runs Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 806 (1 nodes): result Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 807 (1 nodes): Request Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 808 (2 nodes): dataResolver(), fakeData() Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 809 (2 nodes): AgentAvatar(), agentAvatarGlyph() Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 810 (2 nodes): FolderHealthChecklist(), folderHealthItems() Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 811 (2 nodes): managedResourceKey(), skillLabel() Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 812 (2 nodes): SpaceEditCard(), useSpaceFolderStatus() Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 830 (1 nodes): Create Condition from dict. Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Thin community Community 831 (1 nodes): Create Rule from frontmatter dict and message body. Too small to be a meaningful cluster - may be noise or needs more connections extracted.
Suggested Questions
Questions this graph is uniquely positioned to answer:
Why does adaptersByType connect Community 289 to Community 113, Community 129? High betweenness centrality (0.193) - this node is a cross-community bridge.
Why does getTelemetryClient() connect Community 6 to Community 43, Community 63, Community 70, Community 37, Community 14, Community 10, Community 24, Community 57? High betweenness centrality (0.102) - this node is a cross-community bridge.
Why does queryKeys connect Community 2 to Community 40, Community 8, Community 25, Community 26, Community 5, Community 12, Community 9, Community 227, Community 11, Community 41, Community 32, Community 44, Community 223, Community 22, Community 142, Community 39, Community 53, Community 585, Community 247, Community 265, Community 320, Community 335, Community 4, Community 310, Community 195, Community 23, Community 197, Community 412, Community 13? High betweenness centrality (0.038) - this node is a cross-community bridge.
What connects report, sep, paths to the rest of the system? 6998 weakly-connected nodes found - possible documentation gaps or missing edges.
Should Community 0 be split into smaller, more focused modules? Cohesion score 0.009864137778542122 - nodes in this community are weakly interconnected.
Should Community 1 be split into smaller, more focused modules? Cohesion score 0.009251870324189526 - nodes in this community are weakly interconnected.
Should Community 2 be split into smaller, more focused modules? Cohesion score 0.017420451326598054 - nodes in this community are weakly interconnected.