import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#ebebeb",
		position: "relative",
		paddingHorizontal: 20,
		paddingVertical: 14,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		gap: 20,
		marginBottom: 10,
        justifyContent: 'space-between'
	},
	headerTitle: {
		fontSize: 24,
		fontWeight: "bold",
	},
	body: {},
    menuGroup: {
        marginVertical: 10
    },
    menuGroupTitle: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
		marginBottom: 10,
		letterSpacing: 1.1
    },
    menuGroupOptions: {
		gap: 6
    },
    menuGroupItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
		padding: 10,
    },
	footer: {
		marginVertical: 20,
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center'
	},
	footerTitle: {
		fontSize: 16
	},
	submitBtn: {
		backgroundColor: "#ffd43b",
		borderRadius: 10,
		marginBottom: 20,
	},
	submitBtnTitle: {
		textAlign: "center",
		padding: 10,
		fontWeight: "bold",
		fontSize: 18,
	},
});
