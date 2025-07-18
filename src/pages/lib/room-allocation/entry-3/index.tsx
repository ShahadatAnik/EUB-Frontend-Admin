'use client';

import { lazy, useCallback, useState } from 'react';
import { se } from 'date-fns/locale';
import { AlertCircle, Book, Building2, Settings } from 'lucide-react';
import { useParams } from 'react-router-dom';

// import { IRoom, IRoomAllocation } from '../../config/schema';
import { IFormSelectOption } from '@/components/core/form/types';
import Pdf from '@/components/pdf/room-allocation';
import PdfV2 from '@/components/pdf/room-allocation-v2';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { useOtherBank, useOtherTeachers } from '@/lib/common-queries/other';
// import { GlobalSettingsDialog } from './_components/global-settings-dialog';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { useRoomAllocationData } from '../../config/query';
import { AllocationSummary } from './_components/allocation-summary';
import { RoomSelector } from './_components/room-list';
import { TimeRangePicker } from './_components/time-range-picker';
import { WeekdaySelector } from './_components/weekday-selector';
import { WeeklyScheduleCalendar } from './_components/weekly-schedule-calendar';
import { useGlobalSettings } from './hooks/use-global-settings';
import { useRoomAllocation } from './hooks/use-room-allocation';
import type { RoomAllocation, Weekday } from './lib/types';

const AddOrUpdate = lazy(() => import('./teachers-wise-room-allocation'));

export default function RoomAllocationPage() {
	const { uuid: semesterId } = useParams();
	const { data: teachersList, invalidateQuery: invalidateTeachers } = useOtherTeachers<IFormSelectOption[]>(
		`semester_uuid=${semesterId}&is_room_allocation=true`
	);
	const [open, setOpen] = useState(false);

	const { rooms, selectedRoom, selectedDay, loading, error, selectRoom, setSelectedDay, deleteAllocation } =
		useRoomAllocation(semesterId as string);
	const { data, invalidateQuery: invalidateRoomAllocation } = useRoomAllocationData<RoomAllocation[]>(
		`room_uuid=${selectedRoom?.uuid}&semester_uuid=${semesterId}`
	);
	const { deleteData } = useOtherBank();

	const { settings, updateSettings, resetToDefaults, isLoaded } = useGlobalSettings();

	const [selectedTimeRange, setSelectedTimeRange] = useState<{ from: string; to: string } | null>(null);
	const [showGlobalSettings, setShowGlobalSettings] = useState(false);

	const handleTimeRangeSelect = useCallback((from: string, to: string) => {
		setSelectedTimeRange({ from, to });
	}, []);

	const handleAssignment = useCallback(async () => {
		if (selectedRoom && selectedDay && selectedTimeRange) {
			await new Promise((resolve) => setTimeout(resolve, 2000));

			// console.log('Room assigned:', {
			// 	roomId: selectedRoom.uuid,
			// 	roomName: selectedRoom.name,
			// 	day: selectedDay,
			// 	from: selectedTimeRange.from,
			// 	to: selectedTimeRange.to,
			// 	semesterId: semesterId,
			// 	timestamp: new Date().toISOString(),
			// });

			setSelectedTimeRange(null);
			alert('Room assigned successfully!');
		}
	}, [selectedRoom, selectedDay, selectedTimeRange, semesterId]);

	const handleDeleteAllocation = useCallback(
		async (allocationId: string) => {
			try {
				await deleteAllocation(allocationId);
				alert('Allocation deleted successfully!');
			} catch (error) {
				alert('Failed to delete allocation. Please try again.');
			}
		},
		[deleteAllocation]
	);

	// Don't render until global settings are loaded
	if (!isLoaded) {
		return (
			<div className='container mx-auto py-6'>
				<div className='flex items-center justify-center py-12'>
					<div className='h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600'></div>
				</div>
			</div>
		);
	}

	return (
		<div className='container mx-auto max-w-7xl space-y-6 py-6'>
			<div className='flex items-center justify-between pb-2'>
				<div className='flex items-center gap-3'>
					<Building2 className='h-7 w-7 text-slate-700' />
					<div>
						<h1 className='text-2xl font-bold text-slate-800'>Room Allocation System</h1>
						<p className='text-sm text-slate-600'>Select a room, choose a day, and pick your time slot</p>
					</div>
				</div>
				<div className='flex gap-2'>
					<Button
						variant='outline'
						size='sm'
						onClick={() => Pdf(data || [])?.print()}
						className='h-9 px-3'
						title='PDF'
					>
						<Book className='mr-2 h-4 w-4' />
						PDF
					</Button>
					<Button
						variant='outline'
						size='sm'
						onClick={() => PdfV2(data || [])?.print()}
						className='h-9 px-3'
						title='PDF V2'
					>
						<Book className='mr-2 h-4 w-4' />
						PDF V2
					</Button>
					<Button
						variant='outline'
						size='sm'
						onClick={() => setOpen(true)}
						className='h-9 px-3'
						title='PDF V2'
					>
						<Book className='mr-2 h-4 w-4' />
						Teacher Wise PDF
					</Button>
				</div>
				{/* <Button
					variant='outline'
					size='sm'
					onClick={() => setShowGlobalSettings(true)}
					className='h-9 px-3'
					title='Global Settings'
				>
					<Settings className='mr-2 h-4 w-4' />
					Settings
				</Button> */}
			</div>

			{error && (
				<Alert variant='destructive' className='border-red-200 bg-red-50'>
					<AlertCircle className='h-4 w-4' />
					<AlertDescription className='text-red-800'>{error}</AlertDescription>
				</Alert>
			)}

			<div className='space-y-5'>
				<Card className='border-slate-200 shadow-sm'>
					<CardHeader className='pb-4'>
						<CardTitle className='text-lg text-slate-800'>Room & Day Selection</CardTitle>
						<CardDescription className='text-sm text-slate-600'>
							Choose your room and preferred weekday to get started
						</CardDescription>
					</CardHeader>
					<CardContent className='pt-0'>
						<div className='grid gap-6 md:grid-cols-2'>
							<div className='space-y-2'>
								<label className='text-sm font-medium text-slate-700'>Select Room</label>
								<RoomSelector
									rooms={rooms}
									selectedRoom={selectedRoom}
									onRoomSelect={selectRoom}
									loading={loading}
								/>
							</div>
							{selectedRoom && (
								<div className='space-y-2'>
									<label className='text-sm font-medium text-slate-700'>Select Day</label>
									<WeekdaySelector
										selectedDay={selectedDay}
										onDaySelect={(day: Weekday) => setSelectedDay(day)}
										disabled={loading}
									/>
								</div>
							)}
						</div>
					</CardContent>
				</Card>

				{selectedRoom && selectedDay && (
					<>
						<Separator className='bg-slate-200' />
						<div className='grid gap-5 lg:grid-cols-2'>
							<TimeRangePicker
								allocations={data?.filter((allocation) => allocation.day === selectedDay) || []}
								selectedDay={selectedDay}
								onTimeRangeSelect={handleTimeRangeSelect}
								room={selectedRoom}
								day={selectedDay}
								semesterId={semesterId as string}
								onAssignment={handleAssignment}
								globalSettings={settings}
							/>
							<AllocationSummary
								allocations={data?.filter((allocation) => allocation.day === selectedDay) || []}
								selectedDay={selectedDay}
								invalidateRoomAllocation={invalidateRoomAllocation}
								invalidateTeachers={invalidateTeachers}
								deleteData={deleteData}
								onDeleteAllocation={handleDeleteAllocation}
							/>
						</div>
					</>
				)}

				{/* Weekly Schedule Calendar - Always show when room is selected */}
				{selectedRoom && (
					<>
						<Separator className='bg-slate-200' />
						<WeeklyScheduleCalendar
							allocations={data || []}
							roomName={selectedRoom.name}
							globalSettings={settings}
						/>
					</>
				)}
			</div>
			{renderSuspenseModals([
				<AddOrUpdate
					{...{
						open: open,
						setOpen: setOpen,
						teachersList: teachersList,
						semester_uuid: semesterId as string,
					}}
				/>,
			])}

			{/* Global Settings Dialog */}
			{/*<GlobalSettingsDialog
				open={showGlobalSettings}
				onOpenChange={setShowGlobalSettings}
				settings={settings}
				onSettingsChange={updateSettings}
				onReset={resetToDefaults}
			/>*/}
		</div>
	);
}
