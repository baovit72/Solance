import { TimeFormatPipe } from './time-format.pipe';
import { DurationFormatPipe } from './duration-format.pipe';
import { UtcToLocalPipe } from './utc-to-local.pipe';
import { ReplacePipe } from './replace.pipe';
import { Nl2BrPipe, SafeHtmlPipe, TruncatePipe } from './text.pipe';
import { FilterArrayPipe } from './filter-array.pipe';

export const Pipes = [
	TimeFormatPipe,
	DurationFormatPipe,
	UtcToLocalPipe,
	ReplacePipe,
	SafeHtmlPipe,
	Nl2BrPipe,
	TruncatePipe,
	FilterArrayPipe
];
