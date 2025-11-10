import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, Loader2 } from "lucide-react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  firstName: z.string()
    .trim()
    .min(1, "First name is required")
    .max(100, "First name must be less than 100 characters"),
  email: z.string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
  phone: z.string()
    .optional()
    .refine((val) => !val || isValidPhoneNumber(val), {
      message: "Please enter a valid phone number",
    }),
  wantsEarlyBird: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

export const EmailCaptureForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [defaultCountry, setDefaultCountry] = useState<any>("US");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      email: "",
      phone: "",
      wantsEarlyBird: true,
    },
  });

  // Geo-detect country code
  useEffect(() => {
    const detectCountry = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        if (data.country_code) {
          setDefaultCountry(data.country_code);
        }
      } catch (error) {
        console.error("Could not detect country:", error);
      }
    };
    detectCountry();
  }, []);

  const onSubmit = async (data: FormValues) => {
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Form data:", data);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="glass-dark border-primary/30 rounded-2xl p-8 sm:p-12 text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-white font-playfair">
          You're on the List!
        </h3>
        <p className="text-white/70 leading-relaxed max-w-md mx-auto">
          Check your email for confirmation. You're now on the waitlist.
        </p>
        <p className="text-white/50 text-sm">
          We'll notify you when the DOX launches with your exclusive discount code.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="glass-dark border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white text-sm font-medium">
                  First Name *
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="John"
                    {...field}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-primary"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white text-sm font-medium">
                  Email *
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    {...field}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-primary"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white text-sm font-medium">
                Phone <span className="text-white/40">(optional)</span>
              </FormLabel>
              <FormControl>
                <PhoneInput
                  international
                  defaultCountry={defaultCountry}
                  value={field.value}
                  onChange={field.onChange}
                  className="phone-input bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white placeholder:text-white/40 focus-within:border-primary"
                  numberInputProps={{
                    className: "bg-transparent border-none outline-none text-white w-full"
                  }}
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="wantsEarlyBird"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mt-0.5 border-white/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                </FormControl>
                <FormLabel className="text-white/90 text-sm leading-relaxed cursor-pointer font-normal">
                  I want exclusive launch pricing and to save <span className="text-primary font-semibold">$200</span>
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        <button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full px-8 py-4 bg-gradient-secondary text-white rounded-lg font-semibold text-lg shadow-luxury hover:shadow-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Securing Your Spot...</span>
            </>
          ) : (
            <span>Secure My Spot</span>
          )}
        </button>
      </form>
    </Form>
  );
};
