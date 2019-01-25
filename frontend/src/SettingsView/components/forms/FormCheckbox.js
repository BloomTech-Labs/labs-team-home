import React from 'react';

const FormCheckbox = props => {
	console.log('PROPS', props);
	return (
		<div className="form-group">
			<label for={props.name} className="form-label">
				{props.title}
			</label>
			<div className="checkbox">
				{props.options.map(option => {
					return (
						<label key={option.title} className="checkbox-inline">
							<input
								id={option.value}
								onChange={props.handleSelect}
								value={option.value}
								checked={props.selected.indexOf(option.value) > -1}
								type="checkbox"
							/>
							{option.title}
						</label>
					);
				})}
			</div>
		</div>
	);
};

export default FormCheckbox;
