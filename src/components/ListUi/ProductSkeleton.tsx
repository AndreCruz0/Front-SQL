import { Skeleton } from '@/components/ui/skeleton';

export function ProductSkeleton() {
	return (
		<div className="p-4">
			<Skeleton className="h-8 w-full rounded-md mb-2 bg-gray-700" />
			<Skeleton className="h-8 w-full rounded-md mb-2 bg-gray-700" />
			<Skeleton className="h-8 w-full rounded-md bg-gray-700" />
		</div>
	);
}
