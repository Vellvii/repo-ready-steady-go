import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { PrelaunchFooter } from "@/components/prelaunch/PrelaunchFooter";
import { ScrollHeader } from "@/components/ScrollHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Shield, 
  CheckCircle, 
  Upload, 
  QrCode, 
  ArrowLeft,
  Calendar,
  Mail,
  Phone,
  User,
  FileText,
  Package,
  Store,
  ShoppingBag,
  AlertCircle
} from "lucide-react";
import { motion } from "framer-motion";

type ProductType = "dox" | "lux" | "";
type PurchaseSource = "shopify" | "retailer" | "";

const generateRegistrationId = (): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "WR-";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const WarrantyRegister = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const [productType, setProductType] = useState<ProductType>("");
  const [purchaseSource, setPurchaseSource] = useState<PurchaseSource>("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [registrationId, setRegistrationId] = useState("");
  const [verificationError, setVerificationError] = useState<string | null>(null);

  useEffect(() => {
    const product = searchParams.get("product")?.toLowerCase();
    if (product === "dox" || product === "lux") {
      setProductType(product);
    }
  }, [searchParams]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a JPG, PNG, WebP, or PDF file.",
          variant: "destructive",
        });
        return;
      }
      
      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 10MB.",
          variant: "destructive",
        });
        return;
      }
      
      setReceiptFile(file);
      
      // Create preview for images
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setReceiptPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setReceiptPreview(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerificationError(null);
    
    if (!productType) {
      toast({
        title: "Product type required",
        description: "Please select whether you're registering a DOX or LUX.",
        variant: "destructive",
      });
      return;
    }
    
    if (!purchaseSource) {
      toast({
        title: "Purchase source required",
        description: "Please select where you purchased your product.",
        variant: "destructive",
      });
      return;
    }
    
    if (!receiptFile) {
      toast({
        title: "Receipt required",
        description: "Please upload a photo of your receipt or order confirmation.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Generate unique registration ID
      const newRegistrationId = generateRegistrationId();
      
      // Upload receipt to storage
      const fileExt = receiptFile.name.split(".").pop();
      const fileName = `${newRegistrationId}-${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from("warranty-receipts")
        .upload(fileName, receiptFile);
      
      if (uploadError) {
        throw new Error("Failed to upload receipt: " + uploadError.message);
      }
      
      // Call edge function to insert record and send emails
      const { data, error: functionError } = await supabase.functions.invoke(
        "warranty-register",
        {
          body: {
            registration_id: newRegistrationId,
            product_type: productType,
            customer_name: customerName,
            customer_email: customerEmail,
            customer_phone: customerPhone || null,
            order_number: orderNumber,
            purchase_date: purchaseDate,
            receipt_url: fileName,
            purchase_source: purchaseSource,
          },
        }
      );
      
      if (functionError) {
        throw new Error("Failed to register warranty: " + functionError.message);
      }
      
      if (data?.error) {
        // Handle verification error specifically
        if (data?.code === "ORDER_NOT_VERIFIED") {
          setVerificationError(data.reason || "Order could not be verified");
          throw new Error(data.reason || "Order verification failed");
        }
        throw new Error(data.error);
      }
      
      if (functionError) {
        throw new Error("Failed to register warranty: " + functionError.message);
      }
      
      if (data?.error) {
        throw new Error(data.error);
      }
      
      setRegistrationId(newRegistrationId);
      setIsSuccess(true);
      
      toast({
        title: "Warranty Registered!",
        description: `Your registration ID is ${newRegistrationId}. A confirmation email has been sent.`,
      });
      
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <SEO
          title="Warranty Registered | Vellvii"
          description="Your Vellvii product warranty has been successfully registered."
          canonical="/warranty/register"
        />
        
        <ScrollHeader />
        
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 sm:px-6 max-w-lg">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-6"
              >
                <CheckCircle className="w-10 h-10 text-primary" />
              </motion.div>
              
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground font-baskerville mb-4">
                Warranty Registered!
              </h1>
              
              <p className="text-light-secondary mb-8">
                Your {productType.toUpperCase()} warranty has been successfully registered.
              </p>
              
              <div className="bg-surface-dark border border-white/10 rounded-2xl p-6 mb-8">
                <p className="text-sm text-muted-foreground mb-2">Your Registration ID</p>
                <p className="text-2xl font-mono font-bold text-primary">{registrationId}</p>
                <p className="text-sm text-light-secondary mt-4">
                  Save this ID for future warranty claims. You'll need it when contacting support.
                </p>
              </div>
              
              <div className="space-y-4">
                <Link to="/warranty">
                  <Button variant="outline" className="w-full">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Warranty Info
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </main>
        
        <PrelaunchFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="Register Your Warranty | Vellvii"
        description="Register your Vellvii DOX or LUX product warranty. Required for warranty service."
        canonical="/warranty/register"
      />
      
      <ScrollHeader />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-lg">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <QrCode className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground font-baskerville mb-4">
              Register Your Warranty
            </h1>
            <p className="text-light-secondary">
              Complete your registration to activate your lifetime warranty.
            </p>
          </div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Product Type */}
            <div className="space-y-2">
              <Label className="text-light-primary flex items-center gap-2">
                <Package className="w-4 h-4" />
                Product Type *
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setProductType("dox")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    productType === "dox"
                      ? "border-primary bg-primary/10"
                      : "border-white/10 bg-surface-dark hover:border-white/20"
                  }`}
                >
                  <span className="font-semibold text-light-primary">DOX</span>
                  <p className="text-xs text-muted-foreground mt-1">Storage Box</p>
                </button>
                <button
                  type="button"
                  onClick={() => setProductType("lux")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    productType === "lux"
                      ? "border-primary bg-primary/10"
                      : "border-white/10 bg-surface-dark hover:border-white/20"
                  }`}
                >
                  <span className="font-semibold text-light-primary">LUX</span>
                  <p className="text-xs text-muted-foreground mt-1">Travel Bag</p>
                </button>
              </div>
            </div>

            {/* Purchase Source */}
            <div className="space-y-2">
              <Label className="text-light-primary flex items-center gap-2">
                <Store className="w-4 h-4" />
                Where did you purchase? *
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setPurchaseSource("shopify");
                    setVerificationError(null);
                  }}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    purchaseSource === "shopify"
                      ? "border-primary bg-primary/10"
                      : "border-white/10 bg-surface-dark hover:border-white/20"
                  }`}
                >
                  <ShoppingBag className="w-5 h-5 mx-auto mb-2 text-light-primary" />
                  <span className="font-semibold text-light-primary">Vellvii.com</span>
                  <p className="text-xs text-muted-foreground mt-1">Our online store</p>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPurchaseSource("retailer");
                    setVerificationError(null);
                  }}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    purchaseSource === "retailer"
                      ? "border-primary bg-primary/10"
                      : "border-white/10 bg-surface-dark hover:border-white/20"
                  }`}
                >
                  <Store className="w-5 h-5 mx-auto mb-2 text-light-primary" />
                  <span className="font-semibold text-light-primary">Retail Partner</span>
                  <p className="text-xs text-muted-foreground mt-1">Authorized retailer</p>
                </button>
              </div>
              {purchaseSource === "shopify" && (
                <p className="text-xs text-primary mt-2">
                  ✓ Your order will be automatically verified
                </p>
              )}
              {purchaseSource === "retailer" && (
                <p className="text-xs text-muted-foreground mt-2">
                  Receipt will be reviewed for verification
                </p>
              )}
            </div>

            {/* Verification Error */}
            {verificationError && (
              <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="text-destructive font-medium mb-1">
                      Order Verification Failed
                    </p>
                    <p className="text-light-secondary">
                      {verificationError}. Please check your order number and email, 
                      or select "Retail Partner" if you purchased from a retailer.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-light-primary flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name *
              </Label>
              <Input
                id="name"
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
                placeholder="Enter your full name"
                className="!bg-[hsl(15,12%,12%)] border-white/10 !text-white placeholder:text-white/50"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-light-primary flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="!bg-[hsl(15,12%,12%)] border-white/10 !text-white placeholder:text-white/50"
              />
            </div>

            {/* Phone (Optional) */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-light-primary flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="Enter your phone number"
                className="!bg-[hsl(15,12%,12%)] border-white/10 !text-white placeholder:text-white/50"
              />
            </div>

            {/* Order Number */}
            <div className="space-y-2">
              <Label htmlFor="orderNumber" className="text-light-primary flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Order Number *
              </Label>
              <Input
                id="orderNumber"
                type="text"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                required
                placeholder="e.g. #12345 or VELLVII-12345"
                className="!bg-[hsl(15,12%,12%)] border-white/10 !text-white placeholder:text-white/50"
              />
              <p className="text-xs text-muted-foreground">
                Found in your order confirmation email
              </p>
            </div>

            {/* Purchase Date */}
            <div className="space-y-2">
              <Label htmlFor="purchaseDate" className="text-light-primary flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Purchase Date *
              </Label>
              <Input
                id="purchaseDate"
                type="date"
                value={purchaseDate}
                onChange={(e) => setPurchaseDate(e.target.value)}
                required
                max={new Date().toISOString().split("T")[0]}
                className="!bg-[hsl(15,12%,12%)] border-white/10 !text-white [color-scheme:dark]"
              />
            </div>

            {/* Receipt Upload */}
            <div className="space-y-2">
              <Label className="text-light-primary flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Receipt / Order Confirmation *
              </Label>
              <div 
                className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                  receiptFile
                    ? "border-primary bg-primary/5"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,application/pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                {receiptPreview ? (
                  <div className="space-y-3">
                    <img 
                      src={receiptPreview} 
                      alt="Receipt preview" 
                      className="max-h-40 mx-auto rounded-lg"
                    />
                    <p className="text-sm text-primary">{receiptFile?.name}</p>
                    <p className="text-xs text-muted-foreground">Click to change</p>
                  </div>
                ) : receiptFile ? (
                  <div className="space-y-2">
                    <FileText className="w-10 h-10 mx-auto text-primary" />
                    <p className="text-sm text-primary">{receiptFile.name}</p>
                    <p className="text-xs text-muted-foreground">Click to change</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-10 h-10 mx-auto text-muted-foreground" />
                    <p className="text-sm text-light-secondary">
                      Upload photo of receipt or order confirmation
                    </p>
                    <p className="text-xs text-muted-foreground">
                      JPG, PNG, WebP, or PDF (max 10MB)
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Info Note */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
              <div className="flex gap-3">
                <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-light-primary font-medium mb-1">
                    Ideally register within 7 days
                  </p>
                  <p className="text-light-secondary">
                    While there's no hard deadline, we recommend registering soon after 
                    purchase to ensure smooth warranty service.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg"
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"
                  />
                  Registering...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5 mr-2" />
                  Register Warranty
                </>
              )}
            </Button>
          </motion.form>

          {/* Back Link */}
          <div className="mt-8 text-center">
            <Link 
              to="/warranty" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Warranty Information
            </Link>
          </div>
        </div>
      </main>

      <PrelaunchFooter />
    </div>
  );
};

export default WarrantyRegister;
