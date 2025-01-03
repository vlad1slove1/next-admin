import HomePage from '@/components/pages/HomePage';
import PageLayout from '@/components/pages/PageLayout';

export default function Home() {
    return (
        <PageLayout showHeader={true}>
            <HomePage />
        </PageLayout>
    );
}
