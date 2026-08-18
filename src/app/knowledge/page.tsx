import type { Metadata } from 'next';
import { KnowledgeIndex } from '@/components/knowledge/KnowledgePages';
import { EDI_SERVICE_SCOPE } from '@/lib/articles';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Knowledge Hub',
  description: `Strategy notes for leaders who run partner ecosystems. ${EDI_SERVICE_SCOPE.short}`,
  alternates: { canonical: '/knowledge' },
  openGraph: {
    title: 'DotLinQ Knowledge Hub',
    description: EDI_SERVICE_SCOPE.short,
    url: `${SITE_URL}/knowledge`,
  },
};

export default function KnowledgeHubPage() {
  return <KnowledgeIndex />;
}
