import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { authApi } from "@/api/api";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import logo from "@/assets/logo.svg";
import logoWhite from "@/assets/logo-white.svg";

export function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { theme } = useTheme();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [profileData, setProfileData] = useState({
    speciality_id: "",
    organization_id: "",
    cv_url: "",
    objectives: "",
    learning_style: "" as "visual" | "auditory" | "reading" | "kinesthetic" | "",
    interests: [] as string[],
    performance_level: "" as "beginner" | "intermediate" | "advanced" | "expert" | "",
    preferredLanguage: "fr" as "ar" | "fr" | "en",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      const passwordRegex =
        /^(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=\D*\d)(?=[^@$!%*?&]*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(formData.password)) {
        toast.error(
          "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character (@$!%*?&)"
        );
        return;
      }

      setIsLoading(true);

      try {
        const userData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        };

        const response = await authApi.register(userData);

        // The token is already set by authApi.register(), but let's ensure it's there
        if (!authApi.getAuthToken()) {
          authApi.setAuthToken(response.token);
        }

        login(response.user, response.token);
        setStep(2);
      } catch (error: any) {
        console.error("Registration error:", error);
        toast.error(error.message || "Registration failed. Please try again.");
        console.error("Registration error:", error);
      } finally {
        setIsLoading(false);
      }
    } else if (step === 2) {
      setIsLoading(true);

      try {
        // Debug: Check if token exists
        const tokenss = authApi.getAuthToken();
        console.log("Token before profile update:", tokenss ? "exists" : "missing");
        
        // Validate required fields
        if (!profileData.organization_id || !profileData.speciality_id || 
            !profileData.objectives || !profileData.learning_style || 
            profileData.interests.length === 0 || !profileData.performance_level) {
          toast.error("Please fill in all required fields");
          return;
        }
        
        const updatedUser = await authApi.updateProfile({
          speciality_id: profileData.speciality_id,
          organization_id: profileData.organization_id,
          cv_url: profileData.cv_url || undefined,
          objectives: profileData.objectives,
          learning_style: profileData.learning_style || undefined,
          interests: profileData.interests,
          performance_level: profileData.performance_level || undefined,
          preferredLanguage: profileData.preferredLanguage,
        });

        // Update the user in AuthContext
        const token = authApi.getAuthToken();
        if (token) {
          login(updatedUser, token);
        } else {
          throw new Error("No authentication token available");
        }

        toast.success("Profile updated successfully!");
        navigate("/dashboard");
      } catch (error: any) {
        toast.error(
          error.message || "Profile update failed. Please try again."
        );
        console.error("Profile update error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 py-12 relative z-10">
        <div className="w-full max-w-md space-y-8 bg-card p-10 rounded-3xl border border-border shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-sm">
          {/* Logo */}
            <div className="flex justify-center">
              <img src={theme === 'dark' ? logoWhite : logo} alt="Rafeeq Logo" className="w-[147px] h-auto" />
            </div>

          {/* Header */}
          <div className="text-center space-y-3">
            <h1 className="text-3xl font-bold text-foreground">
              Create your account
            </h1>
            <p className="text-muted-foreground text-base">
              Join thousands of Algerian students
            </p>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              {/* Progress indicator */}
              <div className="flex items-center justify-center space-x-2 mb-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</div>
                  <span className="ml-2 text-sm font-semibold text-primary">Basic Info</span>
                </div>
                <div className="w-12 h-0.5 bg-border mx-2"></div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-bold">2</div>
                  <span className="ml-2 text-sm font-medium text-muted-foreground">Profile</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 mt-8">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold mb-2.5 text-foreground"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full h-12 px-4 rounded-xl border-2 border-border bg-background/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all hover:border-primary/50"
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold mb-2.5 text-foreground"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full h-12 px-4 rounded-xl border-2 border-border bg-background/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all hover:border-primary/50"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold mb-2.5 text-foreground"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full h-12 px-4 rounded-xl border-2 border-border bg-background/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all hover:border-primary/50"
                      placeholder="Create a strong password"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-semibold mb-2.5 text-foreground"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full h-12 px-4 rounded-xl border-2 border-border bg-background/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all hover:border-primary/50"
                      placeholder="Confirm your password"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] font-bold py-6 rounded-xl mt-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      Continue
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </span>
                  )}
                </Button>
              </form>

              <div className="relative flex py-6 items-center">
                <div className="flex-grow border-t border-border"></div>
                <span className="flex-shrink mx-4 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                  Or
                </span>
                <div className="flex-grow border-t border-border"></div>
              </div>

              <div>
                <Button
                  variant="outline"
                  className="w-full h-12 border-2 border-border hover:bg-muted hover:border-primary/30 transition-all rounded-xl font-semibold"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </Button>
              </div>

              <div className="text-center text-sm pt-6">
                <p className="text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    to="/auth/login"
                    className="text-primary hover:text-primary/80 font-bold transition-colors underline underline-offset-4 decoration-2"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              {/* Progress indicator */}
              <div className="flex items-center justify-center space-x-2 mb-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">✓</div>
                  <span className="ml-2 text-sm font-medium text-muted-foreground">Basic Info</span>
                </div>
                <div className="w-12 h-0.5 bg-primary mx-2"></div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">2</div>
                  <span className="ml-2 text-sm font-semibold text-primary">Profile</span>
                </div>
              </div>

              <div className="text-center space-y-2">
                <h2 className="text-xl font-bold text-foreground">Complete Your Profile</h2>
                <p className="text-sm text-muted-foreground">
                  Help us personalize your experience
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 max-h-[450px] overflow-y-auto px-1 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent hover:scrollbar-thumb-primary/40">
                <div>
                  <label
                    htmlFor="organization_id"
                    className="block text-sm font-medium mb-2 text-foreground"
                  >
                    University / Organization <span className="text-destructive">*</span>
                  </label>
                  <select
                    id="organization_id"
                    name="organization_id"
                    value={profileData.organization_id}
                    onChange={handleProfileChange}
                    className="w-full h-11 px-4 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition-all"
                    required
                  >
                    <option value="">Select your university</option>
                    <option value="org-1">University of Algiers</option>
                    <option value="org-2">University of Constantine</option>
                    <option value="org-3">University of Oran</option>
                    <option value="org-4">University of Annaba</option>
                    <option value="org-5">University of Batna</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="speciality_id"
                    className="block text-sm font-medium mb-2 text-foreground"
                  >
                    Speciality <span className="text-destructive">*</span>
                  </label>
                  <select
                    id="speciality_id"
                    name="speciality_id"
                    value={profileData.speciality_id}
                    onChange={handleProfileChange}
                    className="w-full h-11 px-4 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition-all"
                    required
                  >
                    <option value="">Select your speciality</option>
                    <option value="spec-1">Computer Science</option>
                    <option value="spec-2">Mathematics</option>
                    <option value="spec-3">Physics</option>
                    <option value="spec-4">Engineering</option>
                    <option value="spec-5">Medicine</option>
                    <option value="spec-6">Law</option>
                    <option value="spec-7">Business</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="cv_url"
                    className="block text-sm font-medium mb-2 text-foreground"
                  >
                    CV / Resume (Optional)
                  </label>
                  <input
                    type="file"
                    id="cv_url"
                    accept=".pdf,.doc,.docx"
                    className="w-full h-11 px-4 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition-all file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        // TODO: Upload file to server and get URL
                        // For now, just store the filename
                        setProfileData({ ...profileData, cv_url: file.name });
                      }
                    }}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Upload your CV in PDF or Word format (Max 5MB)
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="objectives"
                    className="block text-sm font-medium mb-2 text-foreground"
                  >
                    Learning Objectives <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="objectives"
                    name="objectives"
                    value={profileData.objectives}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm min-h-[100px] focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition-all resize-none"
                    placeholder="What do you want to achieve? (e.g., Master data structures, Prepare for exams, Learn web development...)"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Learning Style *
                  </label>
                  <div className="space-y-2">
                    {[
                      {
                        value: "visual",
                        label: "Visual",
                        desc: "Images, diagrams, charts",
                        icon: "👁️",
                      },
                      {
                        value: "auditory",
                        label: "Auditory",
                        desc: "Listening, discussions",
                        icon: "👂",
                      },
                      {
                        value: "reading",
                        label: "Reading/Writing",
                        desc: "Text-based learning",
                        icon: "📖",
                      },
                      {
                        value: "kinesthetic",
                        label: "Kinesthetic",
                        desc: "Hands-on practice",
                        icon: "✋",
                      },
                    ].map((style) => (
                      <label
                        key={style.value}
                        className={`flex items-start space-x-3 p-3 border rounded-md cursor-pointer transition-all ${
                          profileData.learning_style === style.value
                            ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="learning_style"
                          value={style.value}
                          checked={profileData.learning_style === style.value}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              learning_style: e.target.value as
                                | "visual"
                                | "auditory"
                                | "reading"
                                | "kinesthetic",
                            })
                          }
                          className="mt-1"
                          required
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span>{style.icon}</span>
                            <span className="font-medium">{style.label}</span>
                          </div>
                          <span className="text-xs text-gray-600">
                            {style.desc}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Areas of Interest (Select all that apply) *
                  </label>
                  <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto p-1">
                    {[
                      "Programming",
                      "Mathematics",
                      "Physics",
                      "Chemistry",
                      "Biology",
                      "History",
                      "Literature",
                      "Languages",
                      "Engineering",
                      "Data Science",
                      "Artificial Intelligence",
                      "Business",
                      "Medicine",
                      "Law",
                      "Architecture",
                      "Psychology",
                    ].map((interest) => (
                      <label
                        key={interest}
                        className={`flex items-center space-x-2 p-3 border rounded-lg cursor-pointer transition-all ${
                          profileData.interests.includes(interest)
                            ? "border-primary bg-primary/10"
                            : "border-input hover:border-primary hover:bg-accent"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={profileData.interests.includes(interest)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setProfileData({
                                ...profileData,
                                interests: [...profileData.interests, interest],
                              });
                            } else {
                              setProfileData({
                                ...profileData,
                                interests: profileData.interests.filter(
                                  (i) => i !== interest
                                ),
                              });
                            }
                          }}
                          className="h-4 w-4 rounded border-input text-primary focus:ring-ring accent-primary"
                        />
                        <span className={`text-sm transition-colors ${profileData.interests.includes(interest) ? "text-primary font-medium" : "text-foreground"}`}>{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="performance_level"
                    className="block text-sm font-medium mb-2 text-foreground"
                  >
                    Performance Level <span className="text-destructive">*</span>
                  </label>
                  <select
                    id="performance_level"
                    name="performance_level"
                    value={profileData.performance_level}
                    onChange={handleProfileChange}
                    className="w-full h-11 px-4 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition-all"
                    required
                  >
                    <option value="">Select your level</option>
                    <option value="beginner">
                      Beginner - Just starting my learning journey
                    </option>
                    <option value="intermediate">
                      Intermediate - Have basic knowledge, building expertise
                    </option>
                    <option value="advanced">
                      Advanced - Strong understanding, working on mastery
                    </option>
                    <option value="expert">
                      Expert - Deep expertise in my field
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="preferredLanguage"
                    className="block text-sm font-medium mb-2 text-foreground"
                  >
                    Preferred Language
                  </label>
                  <select
                    id="preferredLanguage"
                    name="preferredLanguage"
                    value={profileData.preferredLanguage}
                    onChange={handleProfileChange}
                    className="w-full h-11 px-4 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition-all"
                    required
                  >
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                    <option value="ar">العربية</option>
                  </select>
                </div>

                <div className="flex gap-4 sticky bottom-0 bg-background pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="border-primary text-primary hover:bg-purple-50"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-primary hover:bg-primary transition-all shadow-md"
                    disabled={isLoading}
                  >
                    {isLoading
                      ? "Completing Registration..."
                      : "Complete Registration"}
                    {!isLoading && <ChevronRight className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
