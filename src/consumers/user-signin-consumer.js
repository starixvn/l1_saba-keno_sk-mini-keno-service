import { UserSignInConsumer as BaseUserSignInConsumer } from "sc-game-base/src/core/event-consumers";
import { Systems } from "sc-game-base/src/constants";

export default class UserSignInConsumer extends BaseUserSignInConsumer {
    constructor(definition, gameData, userSignInPublisher, playGamePermissionValidator, appConfigs, userInfosRepository) {
        super(gameData, userSignInPublisher, playGamePermissionValidator, appConfigs, userInfosRepository);
        this.definition = definition;
        console.log("UserSignInConsumer initialized with definition:", definition);
    }

    async consume(socketClient, payload) {
        console.log("Consume called with payload:", payload);
        const sabaKenoSystem = 1;
        if (payload?.system === sabaKenoSystem) {
            console.log("Payload system matches, calling super.consume");
            await super.consume(socketClient, payload);
            return;
        }

        const configs = this.gameData.gameConfigs;
        console.log("Game configs:", configs);
        const configuredlyDisabled = !configs || !configs.enabled;
        const disabled = configuredlyDisabled || this.gameData.delayStartTime > 0;
        console.log("Game is disabled:", disabled);

        if (!disabled) {
            console.log("Game is enabled, calling super.consume");
            await super.consume(socketClient, payload);
        } else {
            console.log("Game is disabled, publishing UM notice");
            this.userSignInPublisher.publishUmNotice(socketClient, this.gameData.umMessages);
        }
    }

    handleSignInSuccess(socketClient, userInfo, userSession) {
        console.log("SignIn success for user:", userInfo);
        super.handleSignInSuccess(socketClient, userInfo, userSession);

        console.log("Publishing to game message for definition:", this.definition.name);
        this.userSignInPublisher.publishToGameMessage(socketClient, this.definition.name);
    }
}
