import $ from "jquery";
export const chkUser = async (email, updateSuc) => {
	// check if user exists and then return true/false
	const det = {
		email,
	};
	let asd = false;

	$.ajax({
		type: "POST",
		url: "https://ccs-robovitics.herokuapp.com/exists",
		data: det,
		success: async (data) => {
			// console.log(JSON.parse(data));
			if (data) {
				// console.log(data.response);
				if (data.includes("true")) {
					return updateSuc(true);
				} else if (data.includes("false")) return updateSuc(false);
			}
		},
	});
};
