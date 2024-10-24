
import DestinationSection from "@/components/Home/DestinationSection";
import PackageSection from "@/components/Home/PackageSection";
import SliderApp from "@/components/Home/Slider";
import { cookies } from "next/headers"; // استيراد الكوكيز من next/headers

export default function Home() {
    const cookieStore = cookies();
    const userData = cookieStore.get("Userdata")?.value ? JSON.parse(cookieStore.get("Userdata").value) : null;
    const authToken = cookieStore.get("Authorization")?.value || null;

    return (
        <div className="-mt-36">
            <SliderApp />
            <DestinationSection />
            <PackageSection />
            <div className="mt-5 p-4 border rounded">
                <h2 className="text-lg font-bold">User Data:</h2>
                {userData ? (
                    <pre>{JSON.stringify(userData, null, 2)}</pre>
                ) : (
                    <p>No user data found in cookies.</p>
                )}
                
                <h2 className="text-lg font-bold mt-4">Authorization Token:</h2>
                {authToken ? (
                    <p>{authToken}</p>
                ) : (
                    <p>No authorization token found in cookies.</p>
                )}
            </div>
        </div>
    );
}
