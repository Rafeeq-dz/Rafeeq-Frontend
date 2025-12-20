import { Button } from "@/components/ui/button";
import {
  Search,
  Filter,
  Download,
  BookOpen,
  FileText,
  Video,
  Bookmark,
  Upload,
  Share2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { resourceApi } from "@/api/api";
import { Resource, UserProfile } from "@/types/types";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";

export function ResourcesPage() {
  const [filters, setFilters] = useState({
    type: "",
    subject: "",
    language: "",
    downloadable: false,
  });
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [resources, setResources] = useState<Resource[]>([]);
  const [sharedResources, setSharedResources] = useState<Resource[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [resourceTitle, setResourceTitle] = useState("");
  const [resourceType, setResourceType] = useState<"local" | "external">("local");
  const [resourceUrl, setResourceUrl] = useState("");
  const [resourceSubject, setResourceSubject] = useState("");
  const [resourceDescription, setResourceDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [shareEmail, setShareEmail] = useState("");
  const [currentTab, setCurrentTab] = useState("my-resources");
  const [sharingResourceId, setSharingResourceId] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setIsLoading(true);
        const fetchedResources = await resourceApi.getResources();
        setResources(fetchedResources);
        setSharedResources(
          fetchedResources.filter((r: Resource) => r.sharedBy != null)
        );
      } catch (error) {
        console.error("Failed to fetch resources:", error);
        alert("Failed to load resources.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchResources();
  }, []);

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Handle resource upload
  const uploadResource = async () => {
    if (!resourceTitle.trim()) {
      toast.error("Please provide a title for the resource.");
      return;
    }
    if (resourceType === "local" && !file) {
      toast.error("Please select a file to upload.");
      return;
    }
    if (resourceType === "external" && !resourceUrl.trim()) {
      toast.error("Please provide a valid URL.");
      return;
    }
    if (!user) {
      toast.error("User not authenticated. Please login again.");
      return;
    }
    setIsUploading(true);
    try {
      if (resourceType === "local" && file) {
        const formData = new FormData();
        formData.append("title", resourceTitle);
        formData.append("file", file);
        formData.append("uploadedBy", user._id);
        formData.append("subject", resourceSubject);
        formData.append("description", resourceDescription);
        formData.append(
          "fileType",
          file.type.includes("pdf")
            ? "pdf"
            : file.type.includes("image")
            ? "image"
            : "other"
        );
        const newResource = await resourceApi.uploadResource(formData);
        setResources([...resources, newResource]);
        toast.success("Resource uploaded successfully!");
      } else if (resourceType === "external") {
        // Handle external URL resource
        // For now, just show success - in production, you'd send this to your API
        toast.success("External resource added successfully!");
        console.log("External resource:", { title: resourceTitle, url: resourceUrl, subject: resourceSubject });
      }
      // Reset form
      setFile(null);
      setResourceTitle("");
      setResourceUrl("");
      setResourceSubject("");
      setResourceDescription("");
    } catch (error) {
      console.error("Failed to upload resource:", error);
      toast.error("Failed to upload resource.");
    } finally {
      setIsUploading(false);
    }
  };

  const shareResource = async (resourceId: string) => {
    if (!shareEmail.trim()) {
      alert("Please enter an email address.");
      return;
    }
    try {
      const updatedResource = await resourceApi.shareResource(
        resourceId,
        shareEmail
      );
      setResources(
        resources.map((r) =>
          r._id === resourceId
            ? { ...r, sharedWith: updatedResource.sharedWith }
            : r
        )
      );
      setShareEmail("");
      setSharingResourceId(null);
      toast.success("Resource shared successfully!");
    } catch (error) {
      toast.error("Failed to share resource.");
    }
  };

  // Handle resource download
  const downloadResource = async (resourceId: string) => {
    try {
      await resourceApi.downloadResource(resourceId);
    } catch (error) {
      console.error("Failed to download resource:", error);
      alert("Failed to download resource.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Resource Library</h1>
        </div>
        
        {/* Add Resource Section */}
        <div className="border rounded-lg p-6 bg-card">
          <h2 className="text-lg font-semibold mb-4">Add New Resource</h2>
          <div className="space-y-4">
            {/* Resource Type Toggle */}
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium">Resource Type:</label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={resourceType === "local" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setResourceType("local")}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload File
                </Button>
                <Button
                  type="button"
                  variant={resourceType === "external" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setResourceType("external")}
                >
                  External Link
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title *</label>
                <Input
                  type="text"
                  placeholder="e.g., Analyse Mathématique Chapitre 1"
                  value={resourceTitle}
                  onChange={(e) => setResourceTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subject *</label>
                <select
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                  value={resourceSubject}
                  onChange={(e) => setResourceSubject(e.target.value)}
                >
                  <option value="">Select subject</option>
                  <option value="Mathematics">Mathématiques</option>
                  <option value="Physics">Physique</option>
                  <option value="Chemistry">Chimie</option>
                  <option value="Computer Science">Informatique</option>
                  <option value="Electronics">Électronique</option>
                  <option value="Mechanics">Mécanique</option>
                  <option value="Electrical Engineering">Électrotechnique</option>
                  <option value="Civil Engineering">Génie Civil</option>
                  <option value="Biology">Biologie</option>
                  <option value="Economics">Économie</option>
                  <option value="Management">Gestion</option>
                  <option value="Literature">Littérature</option>
                  <option value="Languages">Langues</option>
                  <option value="Law">Droit</option>
                  <option value="Medicine">Médecine</option>
                  <option value="Pharmacy">Pharmacie</option>
                  <option value="Architecture">Architecture</option>
                </select>
              </div>
            </div>

            {resourceType === "local" ? (
              <div>
                <label className="block text-sm font-medium mb-2">File *</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png,.zip"
                />
                <label
                  htmlFor="file-upload"
                  className="flex items-center justify-center w-full h-32 px-4 transition bg-background border-2 border-dashed rounded-md appearance-none cursor-pointer hover:border-primary focus:outline-none"
                >
                  <div className="flex flex-col items-center space-y-2">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {file ? file.name : "Click to upload or drag and drop"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      PDF, DOC, PPT, Images, or ZIP (Max 50MB)
                    </span>
                  </div>
                </label>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium mb-2">Resource URL *</label>
                <Input
                  type="url"
                  placeholder="https://example.com/resource"
                  value={resourceUrl}
                  onChange={(e) => setResourceUrl(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Link to external resources (e.g., YouTube videos, online documents, university repositories)
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Brief description of the resource..."
                value={resourceDescription}
                onChange={(e) => setResourceDescription(e.target.value)}
              />
            </div>

            <div className="flex justify-end">
              <Button onClick={uploadResource} disabled={isUploading}>
                {isUploading ? "Uploading..." : resourceType === "local" ? "Upload Resource" : "Add Resource"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue={currentTab} className="w-full">
        <TabsList>
          <TabsTrigger
            onClick={() => setCurrentTab("my-resources")}
            value="my-resources"
          >
            My Resources
          </TabsTrigger>
          <TabsTrigger
            onClick={() => setCurrentTab("shared-with-me")}
            value="shared-with-me"
          >
            Shared With Me
          </TabsTrigger>
        </TabsList>

        <TabsContent value="my-resources">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="Search resources..."
                    className="h-9 w-full rounded-md border border-input bg-background px-9 text-sm outline-none focus:border-primary"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                  <div className="flex items-center border rounded-md overflow-hidden">
                    <button
                      className={`p-2 ${
                        viewMode === "grid"
                          ? "bg-primary text-primary-foreground"
                          : "bg-background text-muted-foreground"
                      }`}
                      onClick={() => setViewMode("grid")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="3" width="7" height="7"></rect>
                        <rect x="14" y="3" width="7" height="7"></rect>
                        <rect x="3" y="14" width="7" height="7"></rect>
                        <rect x="14" y="14" width="7" height="7"></rect>
                      </svg>
                    </button>
                    <button
                      className={`p-2 ${
                        viewMode === "list"
                          ? "bg-primary text-primary-foreground"
                          : "bg-background text-muted-foreground"
                      }`}
                      onClick={() => setViewMode("list")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="8" y1="6" x2="21" y2="6"></line>
                        <line x1="8" y1="12" x2="21" y2="12"></line>
                        <line x1="8" y1="18" x2="21" y2="18"></line>
                        <line x1="3" y1="6" x2="3.01" y2="6"></line>
                        <line x1="3" y1="12" x2="3.01" y2="12"></line>
                        <line x1="3" y1="18" x2="3.01" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {isLoading ? (
                <div className="text-center text-muted-foreground py-8">
                  Loading resources...
                </div>
              ) : resources.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  No resources found. Upload some to get started!
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {resources.map((resource) => (
                    <ResourceCard
                      key={resource._id}
                      currentTab={currentTab}
                      resource={resource}
                      onDownload={() => downloadResource(resource._id)}
                      onShare={() => setSharingResourceId(resource._id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-3 font-medium">Title</th>
                        <th className="text-left p-3 font-medium hidden md:table-cell">
                          Type
                        </th>
                        <th className="text-left p-3 font-medium hidden lg:table-cell">
                          Subject
                        </th>
                        <th className="text-left p-3 font-medium hidden lg:table-cell">
                          Language
                        </th>
                        <th className="text-right p-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resources.map((resource) => (
                        <tr key={resource._id} className="border-t">
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              {getResourceIcon(resource.type)}
                              <div>
                                <p className="font-medium">{resource.title}</p>
                                <p className="text-sm text-muted-foreground hidden md:block line-clamp-1">
                                  {resource.description}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 hidden md:table-cell">
                            {resource.type}
                          </td>
                          <td className="p-3 text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => downloadResource(resource._id)}
                            >
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSharingResourceId(resource._id)}
                            >
                              <Share2 className="h-4 w-4 mr-1" />
                              Share
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="border rounded-lg p-6 bg-card h-fit sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Filter Resources</h2>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium mb-1"
                  >
                    Resource Type
                  </label>
                  <select
                    id="type"
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                    value={filters.type}
                    onChange={(e) =>
                      setFilters({ ...filters, type: e.target.value })
                    }
                  >
                    <option value="">All Types</option>
                    <option value="Textbook">Course Materials</option>
                    <option value="Exam">Past Exams</option>
                    <option value="Note">Lecture Notes</option>
                    <option value="Video">Video Lectures</option>
                    <option value="Exercise">TD/TP Solutions</option>
                    <option value="Research">Research Papers</option>
                    <option value="Project">Project Examples</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium mb-1"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                    value={filters.subject}
                    onChange={(e) =>
                      setFilters({ ...filters, subject: e.target.value })
                    }
                  >
                    <option value="">All Subjects</option>
                    <option value="Mathematics">Mathématiques</option>
                    <option value="Physics">Physique</option>
                    <option value="Chemistry">Chimie</option>
                    <option value="Computer Science">Informatique</option>
                    <option value="Electronics">Électronique</option>
                    <option value="Mechanics">Mécanique</option>
                    <option value="Electrical Engineering">Électrotechnique</option>
                    <option value="Civil Engineering">Génie Civil</option>
                    <option value="Biology">Biologie</option>
                    <option value="Economics">Économie</option>
                    <option value="Management">Gestion</option>
                    <option value="Literature">Littérature</option>
                    <option value="Languages">Langues</option>
                    <option value="Law">Droit</option>
                    <option value="Medicine">Médecine</option>
                    <option value="Pharmacy">Pharmacie</option>
                    <option value="Architecture">Architecture</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="language"
                    className="block text-sm font-medium mb-1"
                  >
                    Language
                  </label>
                  <select
                    id="language"
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                    value={filters.language}
                    onChange={(e) =>
                      setFilters({ ...filters, language: e.target.value })
                    }
                  >
                    <option value="">All Languages</option>
                    <option value="Arabic">Arabic</option>
                    <option value="French">French</option>
                    <option value="English">English</option>
                    <option value="Tamazight">Tamazight</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    id="downloadable"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    checked={filters.downloadable}
                    onChange={(e) =>
                      setFilters({ ...filters, downloadable: e.target.checked })
                    }
                  />
                  <label htmlFor="downloadable" className="ml-2 block text-sm">
                    Downloadable resources only
                  </label>
                </div>

                <Button className="w-full">Apply Filters</Button>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium mb-2">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="rounded-full">
                    licence
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    master
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    TD
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    TP
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    exam
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    cours
                  </Button>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium mb-2">Offline Access</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Download resources for offline use in low-connectivity areas.
                </p>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Manage Offline Resources
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="shared-with-me">
          <div className="space-y-6">
            {isLoading ? (
              <div className="text-center text-muted-foreground py-8">
                Loading shared resources...
              </div>
            ) : sharedResources.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                No resources shared with you yet.
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sharedResources.map((resource) => (
                  <ResourceCard
                    key={resource._id}
                    currentTab={currentTab}
                    resource={resource}
                    user={user}
                    onDownload={() => downloadResource(resource._id)}
                    onShare={() => {}}
                  />
                ))}
              </div>
            ) : (
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left p-3 font-medium">Title</th>
                      <th className="text-left p-3 font-medium hidden md:table-cell">
                        Type
                      </th>
                      <th className="text-right p-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sharedResources.map((resource) => (
                      <tr key={resource._id} className="border-t">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            {getResourceIcon(resource.type)}
                            <div>
                              <p className="font-medium">{resource.title}</p>
                              <p className="text-sm text-muted-foreground hidden md:block line-clamp-1">
                                {resource.description}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 hidden md:table-cell">
                          {resource.type}
                        </td>
                        <td className="p-3 text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => downloadResource(resource._id)}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {sharingResourceId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Share Resource</h3>
            <div className="space-y-4">
              <Input
                type="email"
                placeholder="Enter email address"
                value={shareEmail}
                onChange={(e) => setShareEmail(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSharingResourceId(null);
                    setShareEmail("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => shareResource(sharingResourceId)}
                  disabled={!shareEmail.trim()}
                >
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface ResourceCardProps {
  resource: Resource;
  currentTab: string;
  user?: UserProfile | null;
  onDownload: () => void;
  onShare: () => void;
}

function ResourceCard({
  resource,
  currentTab,
  onDownload,
  onShare,
  user,
}: ResourceCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden bg-card hover:border-primary/50 transition-colors">
      <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/5 flex items-center justify-center p-4">
        <div className="w-16 h-16 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center">
          {getResourceIcon(resource.type, 24)}
        </div>
      </div>
      <div className="p-4 space-y-4">
        <div>
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
              {resource.type}
            </span>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Bookmark className="h-4 w-4" />
              </Button>
              {resource.uploadedBy.id === user?._id && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={onShare}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          <h3 className="font-semibold mt-2 line-clamp-1">{resource.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {resource.description}
          </p>
          {currentTab === "shared-with-me" && (
            <div className="text-sm text-gray-600 flex items-center gap-1.5 mt-2">
              <span className="font-medium">Shared by:</span>
              <span className="text-gray-800">
                {typeof resource.sharedBy === "string"
                  ? resource.sharedBy
                  : resource.sharedBy?.name || "Unknown"}
              </span>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center pt-2 border-t">
          <Button size="sm" onClick={onDownload}>
            {resource.downloadable ? (
              <>
                <Download className="mr-1 h-4 w-4" />
                Download
              </>
            ) : (
              "View"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

function getResourceIcon(type: string, size: number = 16) {
  switch (type) {
    case "Textbook":
      return (
        <BookOpen className={`h-${size / 4} w-${size / 4} text-primary/70`} />
      );
    case "Exam":
      return (
        <FileText className={`h-${size / 4} w-${size / 4} text-primary/70`} />
      );
    case "Note":
      return (
        <FileText className={`h-${size / 4} w-${size / 4} text-primary/70`} />
      );
    case "Video":
      return (
        <Video className={`h-${size / 4} w-${size / 4} text-primary/70`} />
      );
    case "Article":
      return (
        <FileText className={`h-${size / 4} w-${size / 4} text-primary/70`} />
      );
    case "Exercise":
      return (
        <FileText className={`h-${size / 4} w-${size / 4} text-primary/70`} />
      );
    default:
      return (
        <FileText className={`h-${size / 4} w-${size / 4} text-primary/70`} />
      );
  }
}
