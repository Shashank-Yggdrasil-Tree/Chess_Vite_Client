import React from 'react';
import { Skeleton } from '@mui/material';

const SkeletonLoading = ({ num = 3, ch = 40, cw = 40, rh = 30, rw = 120 }) => {
	const arr = [...Array(num).keys()];

	return (
		<>
			{arr.map((t) => (
				<div key={t} className="flex items-center gap-2 mb-2 px-4">
					<Skeleton variant="circular" width={cw} height={ch} />
					<Skeleton variant="rounded" width={rw} height={rh} />
				</div>
			))}
		</>
	);
};

export default React.memo(SkeletonLoading);
