const getFlatHeader = (value: any): any => {
	if (typeof value === 'object') {
		return value.props.children
			.map((child: any) => {
				if (typeof child === 'object') return child.props.children;
				return child;
			})
			.join('');
	}
	return value;
};

export default getFlatHeader;
