import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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
		marginBottom: 18,
		justifyContent: "space-between",
	},
	headerTitle: {
		fontSize: 22,
		fontWeight: "bold",
	},
	textInputWithBorder: {
		borderRadius: 6,
		borderWidth: 1,
		borderColor: "#cfcccc",
		paddingHorizontal: 10,
		paddingVertical: 6,
		marginBottom: 14,
		width: "100%",
		fontSize: 16,
	},
	selectField: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
	},
	selectInputLabel: {
		fontSize: 16,
		flexBasis: "30%",
	},
	select: {
		borderRadius: 6,
		borderWidth: 1,
		borderColor: "#cfcccc",
		flexBasis: "50%",
	},
	addNewTaskBtn: {
		padding: 12,
		borderRadius: 6,
		borderWidth: 1,
		borderColor: "#cfcccc",
		flexDirection: "row",
		alignItems: "center",
		gap: 20,
		marginBottom: 10,
	},
	addNewTaskBtnTitle: {
		color: "#858383",
		fontWeight: "bold",
		fontSize: 16,
	},
	subTasksContainer: {

    },
    subTaskContainer: {
        height: 46,
        marginBottom: 6,
    },
	taskHeader: {
		flexDirection: "row",
		gap: 14,
		alignItems: "center",
		position: "relative",
		padding: 12,
		borderRadius: 6,
        backgroundColor: 'white',
        
	},
    iconContainer: {
        position: 'absolute',
        width: 44,
        bottom: 0,
        top: 0,
        right: '2%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
	selectedTasksAction: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		flexDirection: "row",
		justifyContent: "space-between",
		borderTopWidth: 1,
		borderColor: "#e6e6e6",
		paddingHorizontal: 20,
		paddingVertical: 10,
		alignItems: "center",
		zIndex: 1,
		backgroundColor: "#fff",
	},
});

export default styles;