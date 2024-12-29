import ChannelsPage from '@/components/pages/ChannelsPage';
import PageLayout from '@/components/pages/PageLayout';

export default function Page() {
    return (
        <PageLayout showHeader={true}>
            <ChannelsPage />
        </PageLayout>
    );
}
