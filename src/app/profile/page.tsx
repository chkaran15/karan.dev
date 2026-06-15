// app/gallery/page.tsx

import { ComingSoon } from "@/components/sharable/ComingSoon";


export default function ProfilePage() {
    return (
        <ComingSoon
            title="Profile Coming Soon"
            description="We are preparing a personalized profile page for you."
            badge="Profile"
        />
    );
}