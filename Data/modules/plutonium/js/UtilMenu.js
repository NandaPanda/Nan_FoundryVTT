class MenuToolInfo {
	constructor (
		{
			name,
			streamerName,
			Class,
			iconClass,
			getIcon,
			getMinRole,
			isRequireOwner,
			additionalClassesButton,
			pFnOnClick,
		},
	) {
		this.name = name;
		this.streamerName = streamerName;
		this.Class = Class;
		this.iconClass = iconClass;
		this.getIcon = getIcon;
		this.getMinRole = getMinRole;
		this.isRequireOwner = isRequireOwner;
		this.additionalClassesButton = additionalClassesButton;
		this.pFnOnClick = pFnOnClick;
	}
}

export {MenuToolInfo};
