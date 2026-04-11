/**
 * src/components/careers/ApplicationForm.tsx
 * Client component for the job application form embedded in /careers/[slug].
 * Submits multipart form data (including CV file) to POST /api/applications.
 *
 * User Story:
 * As a job applicant, I want to submit my application with a CV directly from the job page,
 * so that I can apply without leaving the website.
 *
 * Acceptance criteria:
 * - Unit testing has been completed
 * - Regression testing has been completed
 */

'use client';

import { useState, useRef } from 'react';
import {
    Send,
    Loader2,
    CheckCircle2,
    AlertCircle,
    Paperclip,
    X,
} from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

// ── Types ─────────────────────────────────────────────────────────────────────
type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface ApplicationFormProps {
    jobId: string;
    jobTitle: string;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FILE_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const formSchema = z.object({
    firstName: z.string().min(2, 'First name is required (min 2 chars).'),
    lastName: z.string().min(2, 'Last name is required (min 2 chars).'),
    email: z.string().email('Please enter a valid email address.'),
    phone: z.string().min(5, 'Phone number is required.'),
    linkedinUrl: z
        .string()
        .url('Please enter a valid LinkedIn URL.')
        .optional()
        .or(z.literal('')),
    coverLetter: z.string().optional(),
    resume: z
        .any()
        .refine(
            (files) =>
                typeof window === 'undefined' || (files && files.length > 0),
            'CV / Resume is required.',
        )
        .refine(
            (files) =>
                typeof window === 'undefined' ||
                !files?.[0] ||
                files[0].size <= MAX_FILE_SIZE,
            'Max file size is 10 MB.',
        )
        .refine(
            (files) =>
                typeof window === 'undefined' ||
                !files?.[0] ||
                ACCEPTED_FILE_TYPES.includes(files[0].type),
            'Only PDF, DOC, and DOCX formats are supported.',
        ),
});

export default function ApplicationForm({
    jobId,
    jobTitle,
}: ApplicationFormProps) {
    const [status, setStatus] = useState<FormStatus>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [fileName, setFileName] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            linkedinUrl: '',
            coverLetter: '',
        },
    });

    const clearFile = () => {
        setFileName(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        form.setValue('resume', undefined, { shouldValidate: true });
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setStatus('loading');
        setErrorMessage('');

        const formData = new FormData();
        formData.append('jobId', jobId);
        // Combine names into full name as expected by the API
        formData.append('fullName', `${values.firstName} ${values.lastName}`);
        formData.append('email', values.email);
        formData.append('phone', values.phone);

        if (values.linkedinUrl)
            formData.append('linkedinUrl', values.linkedinUrl);
        if (values.coverLetter)
            formData.append('coverLetter', values.coverLetter);

        if (values.resume?.[0]) {
            formData.append('resume', values.resume[0]);
        }

        try {
            const response = await fetch('/api/applications', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(
                    data.message || 'Submission failed. Please try again.',
                );
            }

            setStatus('success');
            form.reset();
            clearFile();
        } catch (err: unknown) {
            const message =
                err instanceof Error ? err.message : 'Something went wrong.';
            setErrorMessage(message);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className='flex flex-col items-center justify-center text-center gap-4 py-12 px-6 bg-green-50/50 backdrop-blur-md border border-green-200 rounded-3xl'>
                <div className='bg-green-100 p-4 rounded-full'>
                    <CheckCircle2 className='w-10 h-10 text-green-600' />
                </div>
                <h3 className='text-2xl font-semibold text-gray-900 tracking-tight'>
                    Application Submitted!
                </h3>
                <p className='text-gray-600 max-w-sm leading-relaxed'>
                    Thank you for applying for{' '}
                    <span className='text-primary100 font-semisemibold'>
                        {jobTitle}
                    </span>
                    . We will review your profile and get back to you soon.
                </p>
                <Button
                    variant='link'
                    onClick={() => {
                        setStatus('idle');
                        form.reset();
                        clearFile();
                    }}
                    className='mt-2 text-green-700 font-semibold hover:text-green-800'>
                    Submit another application
                </Button>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='w-full p-8 bg-white border-2 border-gray-100 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden relative z-10'>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-8'>
                    <AnimatePresence mode='wait'>
                        {status === 'error' && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className='flex items-start gap-3 bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 rounded-2xl px-4 py-3 text-sm'>
                                <AlertCircle className='w-5 h-5 mt-0.5 shrink-0' />
                                <p className='font-medium'>{errorMessage}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Name Grid - First/Last Name side-by-side on desktop */}
                    <div className='grid grid-cols-1 gap-8'>
                        <FormField
                            control={form.control}
                            name='firstName'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-[10px] font-bold   tracking-[0.1em] text-gray-500 mb-2 block'>
                                        First Name{' '}
                                        <span className='text-red-500'>*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Amaka'
                                            restrictTo='letters'
                                            className='  bg-white border-gray-300 focus:ring-primary100/20 focus:border-primary100 transition-all rounded-2xl shadow-sm'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className='text-[10px] font-medium mt-1.5' />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='lastName'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-[10px] font-bold   tracking-[0.1em] text-gray-500 mb-2 block'>
                                        Last Name{' '}
                                        <span className='text-red-500'>*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Okonkwo'
                                            restrictTo='letters'
                                            className='  bg-white border-gray-300 focus:ring-primary100/20 focus:border-primary100 transition-all rounded-2xl shadow-sm'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className='text-[10px] font-medium mt-1.5' />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Email and Phone Grid */}
                    <div className='grid grid-cols-1  gap-8'>
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-[10px] font-bold   tracking-[0.1em] text-gray-500 mb-2 block'>
                                        Email Address{' '}
                                        <span className='text-red-500'>*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type='email'
                                            placeholder='amaka@example.com'
                                            className='  bg-white border-gray-300 focus:ring-primary100/20 focus:border-primary100 transition-all rounded-2xl shadow-sm'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className='text-[10px] font-medium mt-1.5' />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='phone'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-[10px] font-bold   tracking-[0.1em] text-gray-500 mb-2 block'>
                                        Phone Number{' '}
                                        <span className='text-red-500'>*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type='tel'
                                            placeholder='+234 800 000 0000'
                                            className='  bg-white border-gray-300 focus:ring-primary100/20 focus:border-primary100 transition-all rounded-2xl shadow-sm'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className='text-[10px] font-medium mt-1.5' />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name='linkedinUrl'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-[10px] font-bold   tracking-[0.1em] text-gray-500 mb-2 block'>
                                    LinkedIn Profile URL
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type='url'
                                        placeholder='https://linkedin.com/in/your-profile'
                                        className='  bg-white border-gray-300 focus:ring-primary100/20 focus:border-primary100 transition-all rounded-2xl shadow-sm'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className='text-[10px] font-medium mt-1.5' />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='coverLetter'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-[10px] font-bold   tracking-[0.1em] text-gray-500 mb-2 block'>
                                    Cover Letter / Pitch
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        rows={4}
                                        placeholder='Tell us what makes you a unique fit for this role...'
                                        className='bg-white border-gray-300 focus:ring-primary100/20 focus:border-primary100 transition-all rounded-2xl shadow-sm resize-none'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className='text-[10px] font-medium mt-1.5' />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='resume'
                        render={({
                            field: { value, onChange, ...fieldProps },
                        }) => (
                            <FormItem>
                                <FormLabel className='text-[10px] font-bold tracking-[0.1em] text-gray-500 mb-2 flex justify-between items-center'>
                                    <span>
                                        CV / Resume{' '}
                                        <span className='text-red-500'>*</span>
                                    </span>
                                    <span className='text-[9px] font-normal lowercase bg-gray-100/50 px-2.5 py-1 rounded-full text-gray-400'>
                                        PDF, DOC (Max 10MB)
                                    </span>
                                </FormLabel>
                                <div className='space-y-4'>
                                    <FormControl>
                                        <div className='relative'>
                                            <label
                                                htmlFor='app-resume'
                                                className='flex items-center justify-center gap-2 cursor-pointer text-sm font-bold text-white bg-primary100 rounded-xl px-6 py-4 hover:shadow-xl hover:shadow-primary100/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 w-full'>
                                                <Paperclip className='w-4 h-4' />
                                                {fileName
                                                    ? 'Replace CV / Resume'
                                                    : 'Attach CV / Resume'}
                                            </label>
                                            <Input
                                                {...fieldProps}
                                                id='app-resume'
                                                type='file'
                                                accept='.pdf,.doc,.docx'
                                                className='sr-only'
                                                ref={(e) => {
                                                    fieldProps.ref(e);
                                                    // @ts-ignore
                                                    fileInputRef.current = e;
                                                }}
                                                onChange={(e) => {
                                                    const file =
                                                        e.target.files?.[0];
                                                    setFileName(
                                                        file ? file.name : null,
                                                    );
                                                    onChange(e.target.files);
                                                }}
                                            />
                                        </div>
                                    </FormControl>

                                    <AnimatePresence>
                                        {fileName && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className='flex items-center justify-between gap-3 p-4 bg-gray-50 border-2 border-dashed border-primary100/20 rounded-2xl group transition-colors hover:border-primary100/40'>
                                                <div className='flex items-center gap-3 overflow-hidden'>
                                                    <div className='bg-primary100/10 p-2 rounded-lg'>
                                                        <Paperclip className='w-4 h-4 text-primary100' />
                                                    </div>
                                                    <div className='flex flex-col overflow-hidden'>
                                                        <span className='text-xs font-bold text-gray-400 uppercase tracking-widest'>
                                                            Attached File
                                                        </span>
                                                        <span className='text-sm font-semibold text-gray-900 truncate'>
                                                            {fileName}
                                                        </span>
                                                    </div>
                                                </div>
                                                <Button
                                                    type='button'
                                                    variant='ghost'
                                                    size='icon'
                                                    onClick={clearFile}
                                                    className='h-9 w-9 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all'>
                                                    <X className='w-5 h-5' />
                                                </Button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                <FormMessage className='text-[10px] font-medium mt-1.5' />
                            </FormItem>
                        )}
                    />

                    <Button
                        type='submit'
                        disabled={status === 'loading'}
                        className='max-w-[300px] w-full h-16 mx-auto border border-primary100/20 rounded-[20px] bg-primary100 text-white font-bold text-lg shadow-2xl shadow-primary100/30 hover:bg-primary100/90 hover:shadow-primary100/40 hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:pointer-events-none'>
                        {status === 'loading' ? (
                            <div className='flex items-center justify-center'>
                                <Loader2 className='w-6 h-6 animate-spin mr-3' />
                                Processing Application...
                            </div>
                        ) : (
                            <div className='flex items-center justify-center'>
                                <Send className='w-5 h-5 mr-3' />
                                Submit Application
                            </div>
                        )}
                    </Button>
                </form>
            </Form>
        </motion.div>
    );
}
