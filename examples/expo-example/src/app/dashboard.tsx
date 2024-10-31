import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { authClient } from "@/lib/auth-client";
import { View } from "react-native";
import Ionicons from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";

export default function Dashboard() {
	const { data: session, error } = authClient.useSession();
	return (
		<Card className="w-10/12">
			<CardHeader>
				<View className="flex-row items-center gap-2">
					<Avatar alt="user-image">
						<AvatarImage
							source={{
								uri: session?.user?.image,
							}}
						/>
						<AvatarFallback>
							<Text>{session?.user?.name[0]}</Text>
						</AvatarFallback>
					</Avatar>
					<View>
						<Text className="font-bold">{session?.user?.name}</Text>
						<Text className="text-sm">{session?.user?.email}</Text>
					</View>
				</View>
			</CardHeader>
			<View className="my-2 flex-row items-center justify-between px-6">
				<Button
					variant="default"
					size="sm"
					className="flex-row items-center gap-2	"
				>
					<Ionicons name="edit" size={16} color="white" />
					<Text>Edit User</Text>
				</Button>
			</View>
			<CardFooter>
				<Button
					variant="secondary"
					onPress={async () => {
						await authClient.signOut();
						router.push("/");
					}}
				>
					<Text>Sign Out</Text>
				</Button>
			</CardFooter>
		</Card>
	);
}