import { UserSignInConsumer as BaseUserSignInConsumer } from "sc-game-base/src/core/event-consumers";

export default class UserSignInConsumer extends BaseUserSignInConsumer {
    constructor(definition, gameData, userSignInPublisher, playGamePermissionValidator, appConfigs, userInfosRepository) {
        super(gameData, userSignInPublisher, playGamePermissionValidator, appConfigs, userInfosRepository);
        this.definition = definition;
    }

    handleSignInSuccess(socketClient, userInfo, userSession) {
        super.handleSignInSuccess(socketClient, userInfo, userSession);
        this.userSignInPublisher.publishToGameMessage(socketClient, this.definition.name);
    }
}
