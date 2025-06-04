import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { useNavigate } from "react-router";
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { useQuestionBank } from '@/contexts/questions-context';

// Schema for each subject with count
const subjectSchema = z.object({
  name: z.string(),
  count: z.number().min(1).max(50),
});

const formSchema = z.object({
  timer: z.number().min(1, "Please select a timer value"),
  subjects: z.array(subjectSchema).max(4, "You can select up to 4 subjects").default([]),
});

// All subject options for display
const allSubjects = [
  { id: 'Mathematics', label: 'Mathematics' },
  { id: 'English', label: 'English' },
  { id: 'Physics', label: 'Physics' },
  { id: 'Chemistry', label: 'Chemistry' },
  { id: 'Biology', label: 'Biology' },
  { id: 'Computer', label: 'Computer' },
];

// Simulate loading delay
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      timer: 0,
      subjects: [],
    },
  });
  const { setSubjects } = useQuestionBank();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { timer, subjects } = values;

    if (subjects.length > 4) {
      toast.warning('You can select up to 4 subjects');
      return;
    }

    setLoading(true);
    setSubjects(subjects);  // Pass { name, count } array to context

    await sleep(1200);
    setLoading(false);

    navigate("/exam", { state: { timer, subjects } });
    setSubmitted(true);
    console.log(values);
  }

  return (
    <div className="p-8 space-y-10 max-w-md mx-auto">
      <h1 className="text-3xl font-semibold">Welcome to QuizSpark</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="timer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Timer</FormLabel>
                <FormControl>
                  <Select
                    value={String(field.value)}
                    onValueChange={(value) => field.onChange(Number(value))}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select timer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Time</SelectLabel>
                        <SelectItem value="5">5 minutes</SelectItem>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subjects"
            render={({ field }) => {
              const selectedSubjects = field.value || [];

              const isSelected = (name: string) =>
                selectedSubjects.some(s => s.name === name);

              const getCount = (name: string) => {
                const subj = selectedSubjects.find(s => s.name === name);
                return subj ? subj.count : 10; // default count 10
              };

              const toggleSubject = (name: string, checked: boolean) => {
                if (checked) {
                  if (selectedSubjects.length >= 4) {
                    toast.warning('You can select up to 4 subjects');
                    return;
                  }
                  field.onChange([...selectedSubjects, { name, count: 10 }]);
                } else {
                  field.onChange(selectedSubjects.filter(s => s.name !== name));
                }
              };

              const changeCount = (name: string, count: number) => {
                const updated = selectedSubjects.map(s =>
                  s.name === name ? { ...s, count } : s
                );
                field.onChange(updated);
              };

              return (
                <FormItem>
                  <FormLabel>Select Subjects and Number of Questions</FormLabel>
                  <FormDescription>You can select up to 4 subjects</FormDescription>

                  {allSubjects.map(subject => (
                    <div key={subject.id} className="flex items-center space-x-3 mb-2">
                      <Checkbox
                        checked={isSelected(subject.label)}
                        onCheckedChange={(checked) => toggleSubject(subject.label, Boolean(checked))}
                      />
                      <span className="flex-1">{subject.label}</span>

                      {isSelected(subject.label) && (
                        <Select
                          value={String(getCount(subject.label))}
                          onValueChange={(value) => changeCount(subject.label, Number(value))}
                        >
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[5, 10, 15, 20, 25, 30].map(num => (
                              <SelectItem key={num} value={String(num)}>
                                {num}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  ))}
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <Button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </Button>
        </form>
      </Form>

      {submitted && (
        <p className="text-green-600 font-medium">
          Form submitted successfully!
        </p>
      )}
    </div>
  );
}
