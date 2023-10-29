import { useState } from "react";
import {
	View,
	Image,
	Text,
	TextInput,
	Pressable,
	StyleSheet,
} from "react-native";

import { useUserContext } from "../../context/user";
import { TextDivider } from "../../components";

function Auth() {
	const [type, setType] = useState("signin");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isInputFocus, setInputFocus] = useState(false);
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const { setUser } = useUserContext();

	const onSignInPress = () => {
		if (email && password) {
			setUser({
				email,
				password,
			});
		}

		if (!email) {
			setEmailError("Required email");
		}

		if (!password) {
			setPasswordError("Required password");
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.banner}>
				<Image
					style={styles.imageBanner}
					source={require("../../../assets/360_F_353847951_JS90PIj6XChsLI9hBLEjptLbjRTVRKpb.jpg")}
				/>
				<View style={styles.textBannerContainer}>
					<Text style={styles.textBanner}>Todo</Text>
				</View>
			</View>
			<Text style={styles.heading}>
				{type === "signin" ? "Sign in" : "Sign up"}
			</Text>
			<TextInput
				style={[
					styles.input,
					{
						marginBottom: emailError ? 4 : 14,
						borderColor: isInputFocus ? "black" : "#ebebeb",
					},
				]}
				value={email}
				onChangeText={setEmail}
				placeholder="Email"
				onFocus={() => {
					setInputFocus(true);
				}}
				onBlur={() => {
					setInputFocus(false);
				}}
			/>
			{emailError && <Text style={styles.error}>{emailError}</Text>}
			<TextInput
				style={[
					styles.input,
					{
						marginBottom: emailError ? 4 : 14,
						borderColor: isInputFocus ? "black" : "#ebebeb",
					},
				]}
				value={password}
				onChangeText={setPassword}
				placeholder="Password"
				secureTextEntry
				onFocus={() => {
					setInputFocus(true);
				}}
				onBlur={() => {
					setInputFocus(false);
				}}
			/>
			{passwordError && <Text style={styles.error}>{passwordError}</Text>}
			<Pressable style={styles.submitBtn} onPress={onSignInPress}>
				<Text style={styles.submitBtnTitle}>Sign in</Text>
			</Pressable>
			<TextDivider dividerDescription={"or"} />
			<View
				style={{
					flexDirection: "row",
					gap: 10,
				}}
			>
				<Pressable style={styles.secondarySubmitBtn}>
					<Text style={styles.submitBtnTitle}>Google</Text>
				</Pressable>
				<Pressable style={styles.secondarySubmitBtn}>
					<Text style={styles.submitBtnTitle}>Facebook</Text>
				</Pressable>
			</View>
			<Text style={styles.submitBtnTitle}>
				Don't have an account? Sign up here
			</Text>
		</View>
	);
}

export default Auth;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: "relative",
	},
	banner: {
		position: "relative",
	},
	imageBanner: {
		width: "100%",
		resizeMode: "cover",
		borderRadius: 20,
		height: 250,
	},
	textBannerContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	textBanner: {
		color: "white",
		fontSize: 24,
		fontWeight: "bold",
		padding: 20,
	},
	heading: {
		fontSize: 28,
		fontWeight: "bold",
		paddingVertical: 20,
	},
	input: {
		padding: 10,
		borderRadius: 10,

		borderWidth: 1.5,
	},
	error: {
		marginBottom: 14,
		color: "red",
		fontWeight: "bold",
	},
	submitBtn: {
		backgroundColor: "#ffd43b",
		borderRadius: 10,
		marginBottom: 14,
	},
	submitBtnTitle: {
		textAlign: "center",
		padding: 12,
		fontWeight: "bold",
		fontSize: 18,
	},
	secondarySubmitBtn: {
		backgroundColor: "#ebebeb",
		borderRadius: 10,
		marginBottom: 14,
		flex: 1,
	},
});
