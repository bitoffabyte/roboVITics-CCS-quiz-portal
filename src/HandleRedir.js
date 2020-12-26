export const Redir = (email) => {
	// const history = useHistory();
	//console.log(email);
	if (
		(email.includes('2020') && email.includes('vitstudent.ac.in')) ||
		(email.includes('2019') && email.includes('vitstudent.ac.in')) ||
		(email.includes('2018') && email.includes('vitstudent.ac.in')) ||
		(email.includes('2017') && email.includes('vitstudent.ac.in'))
	) {
		return true;
	} else {
		//console.log("asdasdpp");
		// history.push("/error");
		// delete();
		// firebase.auth().sha;

		// firebase.auth().signOut();
		return false;
	}
};
