import {DataConverterActor} from "./DataConverterActor.js";
import {SharedConsts} from "../shared/SharedConsts.js";
import {DataConverter} from "./DataConverter.js";
import {Vetools} from "./Vetools.js";

class DataConverterObject extends DataConverter {
	static _SIDE_LOAD_OPTS = {
		propBrew: "foundryObject",
		fnLoadJson: Vetools.pGetObjectSideData.bind(Vetools),
		propJson: "object",
	};

	static _IMG_FALLBACK = `modules/${SharedConsts.MODULE_NAME}/media/icon/mailed-fist.svg`;

	static async pGetParsedAction (obj, action, monOpts) {
		const {
			damageTuples,
			formula,
			offensiveAbility,
			isAttack,
			rangeShort,
			rangeLong,
			actionType,
			isProficient,
			attackBonus,
		} = DataConverterActor.getParsedActionEntryData(obj, action, monOpts, {mode: "object"});

		const img = await this._pGetSaveImagePath({...obj, _isAttack: isAttack});

		return {
			damageTuples,
			formula,
			offensiveAbility,
			isAttack,
			rangeShort,
			rangeLong,
			actionType,
			isProficient,
			attackBonus,
			_foundryData: action._foundryData,
			foundryData: action.foundryData,
			_foundryFlags: action._foundryFlags,
			foundryFlags: action.foundryFlags,
			img,
		};
	}

	static _getImgFallback (obj) {
		if (obj._isAttack) return `modules/${SharedConsts.MODULE_NAME}/media/icon/crossed-swords.svg`;
	}
}

export {DataConverterObject};
