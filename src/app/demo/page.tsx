"use client";

import React, { useState } from "react";
import {
  AlertCircleIcon,
  FileArchiveIcon,
  FileIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  HeadphonesIcon,
  ImageIcon,
  Trash2Icon,
  UploadIcon,
  VideoIcon,
  XIcon,
} from "lucide-react";

import {
  formatBytes,
  useFileUpload,
  type FileWithPreview,
} from "@/components/file-upload/hooks/use-file-upload";
import { Button } from "@/components/ui/button";
import {
  FileUpload,
  FileUploadPresetRenderer,
  FileUploadJSONRenderer,
  EXAMPLE_CONFIGS,
  PRESET_CONFIGS,
} from "@/components/file-upload";
import type { FileUploadPreset } from "@/components/file-upload";

// Create some dummy initial files
const initialFiles = [
  {
    name: "intro.zip",
    size: 252873,
    type: "application/zip",
    url: "https://example.com/intro.zip",
    id: "intro.zip-1744638436563-8u5xuls",
  },
  {
    name: "image-01.jpg",
    size: 1528737,
    type: "image/jpeg",
    url: "https://picsum.photos/1000/800?grayscale&random=1",
    id: "image-01-123456789",
  },
  {
    name: "audio.mp3",
    size: 1528737,
    type: "audio/mpeg",
    url: "https://example.com/audio.mp3",
    id: "audio-123456789",
  },
];

const getFileIcon = (file: { file: File | { type: string; name: string } }) => {
  const fileType = file.file instanceof File ? file.file.type : file.file.type;
  const fileName = file.file instanceof File ? file.file.name : file.file.name;

  const iconMap = {
    pdf: {
      icon: FileTextIcon,
      conditions: (type: string, name: string) =>
        type.includes("pdf") ||
        name.endsWith(".pdf") ||
        type.includes("word") ||
        name.endsWith(".doc") ||
        name.endsWith(".docx"),
    },
    archive: {
      icon: FileArchiveIcon,
      conditions: (type: string, name: string) =>
        type.includes("zip") ||
        type.includes("archive") ||
        name.endsWith(".zip") ||
        name.endsWith(".rar"),
    },
    excel: {
      icon: FileSpreadsheetIcon,
      conditions: (type: string, name: string) =>
        type.includes("excel") ||
        name.endsWith(".xls") ||
        name.endsWith(".xlsx"),
    },
    video: {
      icon: VideoIcon,
      conditions: (type: string) => type.includes("video/"),
    },
    audio: {
      icon: HeadphonesIcon,
      conditions: (type: string) => type.includes("audio/"),
    },
    image: {
      icon: ImageIcon,
      conditions: (type: string) => type.startsWith("image/"),
    },
  };

  for (const { icon: Icon, conditions } of Object.values(iconMap)) {
    if (conditions(fileType, fileName)) {
      return <Icon className="size-5 opacity-60" />;
    }
  }

  return <FileIcon className="size-5 opacity-60" />;
};

// Type for tracking upload progress
type UploadProgress = {
  fileId: string;
  progress: number;
  completed: boolean;
};

// Function to simulate file upload with more realistic timing and progress
const simulateUpload = (
  totalBytes: number,
  onProgress: (progress: number) => void,
  onComplete: () => void
) => {
  let timeoutId: NodeJS.Timeout;
  let uploadedBytes = 0;
  let lastProgressReport = 0;

  const simulateChunk = () => {
    // Simulate variable network conditions with random chunk sizes
    const chunkSize = Math.floor(Math.random() * 300000) + 2000;
    uploadedBytes = Math.min(totalBytes, uploadedBytes + chunkSize);

    // Calculate progress percentage (0-100)
    const progressPercent = Math.floor((uploadedBytes / totalBytes) * 100);

    // Only report progress if it's changed by at least 1%
    if (progressPercent > lastProgressReport) {
      lastProgressReport = progressPercent;
      onProgress(progressPercent);
    }

    // Continue simulation if not complete
    if (uploadedBytes < totalBytes) {
      // Variable delay between 50ms and 500ms to simulate network fluctuations
      const delay = Math.floor(Math.random() * 450) + 50;

      // Occasionally add a longer pause to simulate network congestion (5% chance)
      const extraDelay = Math.random() < 0.05 ? 500 : 0;

      timeoutId = setTimeout(simulateChunk, delay + extraDelay);
    } else {
      // Upload complete
      onComplete();
    }
  };

  // Start the simulation
  timeoutId = setTimeout(simulateChunk, 100);

  // Return a cleanup function to cancel the simulation
  return () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };
};

// Progress Demo Component
function ProgressDemoComponent() {
  const maxSizeMB = 5;
  const maxSize = maxSizeMB * 1024 * 1024; // 5MB default
  const maxFiles = 6;

  // State to track upload progress for each file
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([]);

  // Function to handle newly added files
  const handleFilesAdded = (addedFiles: FileWithPreview[]) => {
    // Initialize progress tracking for each new file
    const newProgressItems = addedFiles.map((file) => ({
      fileId: file.id,
      progress: 0,
      completed: false,
    }));

    // Add new progress items to state
    setUploadProgress((prev) => [...prev, ...newProgressItems]);

    // Store cleanup functions
    const cleanupFunctions: Array<() => void> = [];

    // Start simulated upload for each file
    addedFiles.forEach((file) => {
      const fileSize =
        file.file instanceof File ? file.file.size : file.file.size;

      // Start the upload simulation and store the cleanup function
      const cleanup = simulateUpload(
        fileSize,
        // Progress callback
        (progress) => {
          setUploadProgress((prev) =>
            prev.map((item) =>
              item.fileId === file.id ? { ...item, progress } : item
            )
          );
        },
        // Complete callback
        () => {
          setUploadProgress((prev) =>
            prev.map((item) =>
              item.fileId === file.id ? { ...item, completed: true } : item
            )
          );
        }
      );

      cleanupFunctions.push(cleanup);
    });

    // Return a cleanup function that cancels all animations
    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup());
    };
  };

  // Remove the progress tracking for the file
  const handleFileRemoved = (fileId: string) => {
    setUploadProgress((prev) => prev.filter((item) => item.fileId !== fileId));
  };

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      clearFiles,
      getInputProps,
    },
  ] = useFileUpload({
    multiple: true,
    maxFiles,
    maxSize,
    initialFiles,
    onFilesAdded: handleFilesAdded,
  });

  return (
    <div className="flex flex-col gap-2">
      {/* Drop area */}
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-dragging={isDragging || undefined}
        data-files={files.length > 0 || undefined}
        className="border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors not-data-[files]:justify-center has-[input:focus]:ring-[3px]"
      >
        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload image file"
        />
        {files.length > 0 ? (
          <div className="flex w-full flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="truncate text-sm font-medium">
                Files ({files.length})
              </h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={openFileDialog}>
                  <UploadIcon
                    className="-ms-0.5 size-3.5 opacity-60"
                    aria-hidden="true"
                  />
                  Add files
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // Clear all progress tracking
                    setUploadProgress([]);
                    clearFiles();
                  }}
                >
                  <Trash2Icon
                    className="-ms-0.5 size-3.5 opacity-60"
                    aria-hidden="true"
                  />
                  Remove all
                </Button>
              </div>
            </div>

            <div className="w-full space-y-2">
              {files.map((file) => {
                // Find the upload progress for this file once to avoid repeated lookups
                const fileProgress = uploadProgress.find(
                  (p) => p.fileId === file.id
                );
                const isUploading = fileProgress && !fileProgress.completed;

                return (
                  <div
                    key={file.id}
                    data-uploading={isUploading || undefined}
                    className="bg-background flex flex-col gap-1 rounded-lg border p-2 pe-3 transition-opacity duration-300"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-3 overflow-hidden in-data-[uploading=true]:opacity-50">
                        <div className="flex aspect-square size-10 shrink-0 items-center justify-center rounded border">
                          {getFileIcon(file)}
                        </div>
                        <div className="flex min-w-0 flex-col gap-0.5">
                          <p className="truncate text-[13px] font-medium">
                            {file.file instanceof File
                              ? file.file.name
                              : file.file.name}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            {formatBytes(
                              file.file instanceof File
                                ? file.file.size
                                : file.file.size
                            )}
                          </p>
                        </div>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-muted-foreground/80 hover:text-foreground -me-2 size-8 hover:bg-transparent"
                        onClick={() => {
                          handleFileRemoved(file.id);
                          removeFile(file.id);
                        }}
                        aria-label="Remove file"
                      >
                        <XIcon className="size-4" aria-hidden="true" />
                      </Button>
                    </div>

                    {/* Upload progress bar */}
                    {fileProgress &&
                      (() => {
                        const progress = fileProgress.progress || 0;
                        const completed = fileProgress.completed || false;

                        if (completed) return null;

                        return (
                          <div className="mt-1 flex items-center gap-2">
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                              <div
                                className="bg-primary h-full transition-all duration-300 ease-out"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                            <span className="text-muted-foreground w-10 text-xs tabular-nums">
                              {progress}%
                            </span>
                          </div>
                        );
                      })()}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
            <div
              className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
              aria-hidden="true"
            >
              <ImageIcon className="size-4 opacity-60" />
            </div>
            <p className="mb-1.5 text-sm font-medium">Drop your files here</p>
            <p className="text-muted-foreground text-xs">
              Max {maxFiles} files ∙ Up to {maxSizeMB}MB
            </p>
            <Button variant="outline" className="mt-4" onClick={openFileDialog}>
              <UploadIcon className="-ms-1 opacity-60" aria-hidden="true" />
              Select images
            </Button>
          </div>
        )}
      </div>

      {errors.length > 0 && (
        <div
          className="text-destructive flex items-center gap-1 text-xs"
          role="alert"
        >
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}

      <p
        aria-live="polite"
        role="region"
        className="text-muted-foreground mt-2 text-center text-xs"
      ></p>
    </div>
  );
}

export default function DemoPage() {
  const [selectedPreset, setSelectedPreset] =
    useState<FileUploadPreset>("default");
  const [basicFiles, setBasicFiles] = useState<FileWithPreview[]>([]);

  const handleBasicFilesChange = (files: FileWithPreview[]) => {
    setBasicFiles(files);
    console.log("Basic files changed:", files);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">
            File Upload Component Demo
          </h1>

          {/* Introduction */}
          <section className="mb-12 text-center">
            <p className="text-lg text-muted-foreground mb-4">
              A comprehensive file upload component library with progress
              tracking, multiple variants, and customizable configurations.
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-sm">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">
                Progress Tracking
              </span>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">
                Multiple Variants
              </span>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">
                Drag & Drop
              </span>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">
                File Validation
              </span>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">
                TypeScript
              </span>
            </div>
          </section>

          {/* Progress Demo */}
          <section className="mb-12">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                🚀 File Upload with Realistic Progress
              </h2>
              <p className="text-muted-foreground">
                Upload files with realistic progress simulation, file type
                icons, and smooth animations. Includes initial dummy files to
                demonstrate the interface.
              </p>
            </div>
            <div className="border border-border rounded-lg p-6 bg-card">
              <ProgressDemoComponent />
            </div>
            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium mb-2">Usage Example:</h4>
              <pre className="text-sm text-muted-foreground overflow-x-auto">
                {`// Custom progress tracking component
const [uploadProgress, setUploadProgress] = useState([]);

const handleFilesAdded = (files) => {
  // Initialize progress for each file
  files.forEach(file => simulateUpload(file));
};

<CustomFileUpload onFilesAdded={handleFilesAdded} />`}
              </pre>
            </div>
          </section>

          {/* Main Variants */}
          <section className="mb-12">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                🎨 Component Variants
              </h2>
              <p className="text-muted-foreground">
                Two main variants optimized for different use cases and user
                experiences.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Dropzone Variant */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-1">
                    Dropzone (Recommended)
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Full-featured drag and drop area with visual feedback. Best
                    for most use cases.
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4 bg-card">
                  <FileUpload
                    variant="dropzone"
                    size="md"
                    multiple
                    maxFiles={3}
                    onFilesChange={handleBasicFilesChange}
                  />
                </div>
                <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                  <code>{`<FileUpload variant="dropzone" multiple maxFiles={3} />`}</code>
                </div>
              </div>

              {/* Compact Variant */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-1">Compact</h3>
                  <p className="text-sm text-muted-foreground">
                    Minimal space-efficient design for tight layouts or
                    secondary upload areas.
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4 bg-card">
                  <FileUpload
                    variant="compact"
                    size="sm"
                    onFilesChange={handleBasicFilesChange}
                  />
                </div>
                <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                  <code>{`<FileUpload variant="compact" size="sm" />`}</code>
                </div>
              </div>
            </div>

            {/* Show selected files */}
            {basicFiles.length > 0 && (
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">
                  Selected Files ({basicFiles.length}):
                </h4>
                <div className="space-y-1">
                  {basicFiles.map((file) => (
                    <div
                      key={file.id}
                      className="text-sm text-muted-foreground"
                    >
                      📄 {file.file.name} ({formatBytes(file.file.size)})
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Preset Examples */}
          <section className="mb-12">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                ⚙️ Preset Examples
              </h2>
              <p className="text-muted-foreground">
                Pre-configured components for common use cases. Each preset
                includes optimized settings for specific file types and
                workflows.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(EXAMPLE_CONFIGS).map(([name, config]) => (
                <div
                  key={name}
                  className="border border-border rounded-lg p-6 bg-card"
                >
                  <div className="mb-4">
                    <h3 className="text-lg font-medium mb-1 capitalize">
                      {name.replace(/([A-Z])/g, " $1").trim()}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {name === "basicUpload" &&
                        "Simple single file upload with button trigger"}
                      {name === "imageGallery" &&
                        "Multiple image upload with preview support"}
                      {name === "documentLibrary" &&
                        "Document upload for PDFs and Office files"}
                    </p>
                  </div>
                  <FileUploadJSONRenderer configJSON={JSON.stringify(config)} />
                  <div className="mt-4 p-3 bg-muted/50 rounded text-xs">
                    <strong>Usage:</strong>
                    <code className="block mt-1 text-muted-foreground">
                      {`<FileUploadJSONRenderer configJSON={JSON.stringify(${name}Config)} />`}
                    </code>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Interactive Preset Selector */}
          <section className="mb-12">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                🎛️ Interactive Preset Selector
              </h2>
              <p className="text-muted-foreground">
                Explore different preset configurations and see their JSON
                structure. Perfect for understanding how to customize
                components.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Select Preset:
                  </label>
                  <select
                    value={selectedPreset}
                    onChange={(e) =>
                      setSelectedPreset(e.target.value as FileUploadPreset)
                    }
                    className="w-full p-3 appearance-none border border-border rounded-md bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {Object.keys(PRESET_CONFIGS).map((preset) => (
                      <option key={preset} value={preset}>
                        {preset
                          .replace("-", " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="border border-border rounded-lg p-4 bg-card">
                  <FileUploadPresetRenderer preset={selectedPreset} />
                </div>
                <div className="p-3 bg-muted/50 rounded text-xs">
                  <strong>Usage:</strong>
                  <code className="block mt-1 text-muted-foreground">
                    {`<FileUploadPresetRenderer preset="${selectedPreset}" />`}
                  </code>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Configuration JSON</h3>
                <div className="bg-muted p-4 rounded-md">
                  <pre className="text-sm overflow-auto max-h-96 text-muted-foreground">
                    {JSON.stringify(
                      PRESET_CONFIGS[selectedPreset] || {},
                      null,
                      2
                    )}
                  </pre>
                </div>
                <div className="text-xs text-muted-foreground">
                  💡 <strong>Tip:</strong> Copy this configuration to create
                  your own custom presets or use it with FileUploadRenderer.
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
