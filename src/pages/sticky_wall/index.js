import { View, StyleSheet } from "react-native";

import { useStickyNoteContext } from "../../context/sticky_notes";

// const colors = []

// function getRandomColor() {
//     return random from colors
// }

function StickyWall() {
    const { stickyNotes, setStickyNotes } = useStickyNoteContext();

    console.log(stickyNotes); // data.json
    return (  
        <View style={styles.container}></View>
    );
}

export default StickyWall;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		position: "relative",
		paddingHorizontal: 20,
		paddingVertical: 14,
	}
});
