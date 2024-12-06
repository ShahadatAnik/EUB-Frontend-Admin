import * as hookFormDevTools from '@hookform/devtools';

export const DevTool: (typeof hookFormDevTools)['DevTool'] =
	process.env.NODE_ENV !== 'development'
		? function () {
				return null;
			}
		: hookFormDevTools.DevTool;
