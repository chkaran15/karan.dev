// app/gallery/page.tsx

import { ComingSoon } from "@/components/sharable/ComingSoon";


export default function ArticlesPage() {
    return (
        <ComingSoon
            title="Articles Coming Soon"
            description="We are preparing insightful articles about travel, culture, and lifestyle for you."
            badge="Articles"
        />
    );
}