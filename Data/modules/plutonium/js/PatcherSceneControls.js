import {libWrapper, UtilLibWrapper} from "./PatcherLibWrapper.js";
import {SharedConsts} from "../shared/SharedConsts.js";

class Patcher_SceneControls {
	// region External

	static preInit () {
		this._addMissingBoxSelectControls();

		this._addBoxSelectSupport_measure();
		this._addBoxSelectSupport_lighting();
		this._addBoxSelectSupport_sounds();
		this._addBoxSelectSupport_notes();
	}

	// endregion

	static _BOX_SELECT_TOOL_METAS = [
		{
			groupName: "measure",
			title: "CONTROLS.MeasureSelect",
		},
		{
			groupName: "lighting",
			title: "CONTROLS.LightSelect",
		},
		{
			groupName: "sounds",
			title: "CONTROLS.SoundSelect",
		},
	];

	static _addMissingBoxSelectControls () {
		Hooks.on("getSceneControlButtons", (buttonMetas) => {
			if (!game.user.isGM) return;

			this._BOX_SELECT_TOOL_METAS.forEach(addMeta => {
				const buttonMeta = buttonMetas.find(it => it.name === addMeta.groupName);
				const isExists = buttonMeta.tools.some(it => it.name === "select");

				if (isExists) return;
				buttonMeta.tools.unshift({
					name: "select",
					title: addMeta.title,
					icon: "fas fa-expand",
				});
			});
		});
	}

	static _addBoxSelectSupport_measure () {
		libWrapper.register(
			SharedConsts.MODULE_NAME,
			"TemplateLayer.layerOptions",
			function (fn, ...args) {
				const out = fn(...args);
				out.controllableObjects = true;
				return out;
			},
			UtilLibWrapper.LIBWRAPPER_MODE_WRAPPER,
		);

		libWrapper.register(
			SharedConsts.MODULE_NAME,
			"MeasuredTemplate.prototype.refresh",
			function (fn, ...args) {
				const out = fn(...args);
				this.hud.icon.border.visible = this._hover || this._controlled;
				return out;
			},
			UtilLibWrapper.LIBWRAPPER_MODE_WRAPPER,
		);
	}

	static _addBoxSelectSupport_lighting () {
		libWrapper.register(
			SharedConsts.MODULE_NAME,
			"LightingLayer.layerOptions",
			function (fn, ...args) {
				const out = fn(...args);
				out.controllableObjects = true;
				return out;
			},
			UtilLibWrapper.LIBWRAPPER_MODE_WRAPPER,
		);

		libWrapper.register(
			SharedConsts.MODULE_NAME,
			"AmbientLight.prototype.refreshControl",
			function (fn, ...args) {
				const out = fn(...args);
				this.controlIcon.border.visible = this._hover || this._controlled;
				return out;
			},
			UtilLibWrapper.LIBWRAPPER_MODE_WRAPPER,
		);
	}

	static _addBoxSelectSupport_sounds () {
		libWrapper.register(
			SharedConsts.MODULE_NAME,
			"SoundsLayer.layerOptions",
			function (fn, ...args) {
				const out = fn(...args);
				out.controllableObjects = true;
				return out;
			},
			UtilLibWrapper.LIBWRAPPER_MODE_WRAPPER,
		);

		libWrapper.register(
			SharedConsts.MODULE_NAME,
			"AmbientSound.prototype.refreshControl",
			function (fn, ...args) {
				const out = fn(...args);
				this.controlIcon.border.visible = this._hover || this._controlled;
				return out;
			},
			UtilLibWrapper.LIBWRAPPER_MODE_WRAPPER,
		);
	}

	static _addBoxSelectSupport_notes () {
		libWrapper.register(
			SharedConsts.MODULE_NAME,
			"NotesLayer.layerOptions",
			function (fn, ...args) {
				const out = fn(...args);
				out.controllableObjects = true;
				return out;
			},
			UtilLibWrapper.LIBWRAPPER_MODE_WRAPPER,
		);

		libWrapper.register(
			SharedConsts.MODULE_NAME,
			"Note.prototype.refresh",
			function (fn, ...args) {
				const out = fn(...args);
				this.controlIcon.border.visible = this._hover || this._controlled;
				return out;
			},
			UtilLibWrapper.LIBWRAPPER_MODE_WRAPPER,
		);
	}
}

export {Patcher_SceneControls};
