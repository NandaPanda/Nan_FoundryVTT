import {libWrapper, UtilLibWrapper} from "./PatcherLibWrapper.js";
import {SharedConsts} from "../shared/SharedConsts.js";
import {ImportList} from "./ImportList.js";
import {LootGeneratorApp} from "./LootGeneratorApp.js";

class Patcher_ActorSheet {
	static init () {
		// region libWrapper doesn't support one module patching the same method multiple times, so register one fat
		//   handler here.
		libWrapper.register(
			SharedConsts.MODULE_NAME,
			"ActorSheet.prototype._onDrop",
			async function (fn, ...args) {
				const fnsSub = [
					ImportList.patcher_pHandleActorDrop,
					LootGeneratorApp.patcher_pHandleActorDrop,
				];
				for (const fn of fnsSub) {
					const out = await fn.bind(this)(...args);
					if (out) return out; // If we handled the event, block the base handler
				}
				return fn(...args);
			},
			UtilLibWrapper.LIBWRAPPER_MODE_MIXED,
		);
		// endregion
	}
}

export {Patcher_ActorSheet};
