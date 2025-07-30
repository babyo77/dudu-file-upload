# Dudu File Upload Components

A highly customizable, config-driven file upload component library built with React, TailwindCSS, and class-variance-authority. Inspired by shadcn/ui's API patterns with support for multiple variants, themes, and JSON-based configuration.

## ✨ Features

- 🎨 **Multiple Variants**: Button, dropzone, preview, and compact layouts
- 🎯 **Config-Driven**: JSON-based configuration for easy customization
- 🎭 **Theme Support**: Built-in themes with TailwindCSS integration
- ♿ **Accessible**: Full keyboard navigation and screen reader support
- 📱 **Responsive**: Works seamlessly across all device sizes
- 🔧 **TypeScript**: Full type safety and IntelliSense support
- 🎪 **Drag & Drop**: Native drag and drop with keyboard fallback
- 🖼️ **Preview Support**: Image previews and file type icons
- 📏 **Validation**: File size, type, and count validation
- 🎛️ **Flexible API**: Use as components or config-driven renderers

## 📦 Installation

### 1. Install the Package

```bash
npm install dudu-file-upload-components
# or
yarn add dudu-file-upload-components
# or
pnpm add dudu-file-upload-components
```

### 2. Install Required Peer Dependencies

**Important**: You must install the required peer dependencies manually to avoid version conflicts and reduce bundle size.

```bash
npm install react react-dom lucide-react class-variance-authority clsx @radix-ui/react-slot
```

### 3. Import Styles

**Important**: Import the CSS file in your main application file (e.g., `main.tsx`, `App.tsx`, or `_app.tsx`):

```tsx
import "dudu-file-upload-components/dist/style.css";
```

This CSS file contains all the necessary styles including:

- CSS variables for theming
- All required TailwindCSS utility classes
- Component-specific styles
- **Works standalone** - No TailwindCSS required in your project!

### 4. Configure TailwindCSS (Optional)

If you're using TailwindCSS in your project, you can optionally add the component paths to your `tailwind.config.js` for better integration:

```js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/dudu-file-upload-components/**/*.{js,ts,jsx,tsx}",
  ],
  // ... rest of your config
};
```

**Note**: This step is optional. The components work perfectly without TailwindCSS in your project.

### Why Install Peer Dependencies Manually?

1. **Version Flexibility**: Use your preferred versions of React and other dependencies
2. **Bundle Size**: Prevents duplicate dependencies in your project
3. **Compatibility**: Ensures the component works with your existing React setup
4. **Control**: You maintain control over which versions are used in your project

## 🚀 Quick Start

### Basic Usage

```tsx
import { FileUpload } from "dudu-file-upload-components";
import "dudu-file-upload-components/dist/style.css";

function App() {
  const handleFilesChange = (files) => {
    console.log("Files:", files);
  };

  return <FileUpload variant="dropzone" onFilesChange={handleFilesChange} />;
}
```

### Using Presets

```tsx
import { FileUploadPresetRenderer } from "dudu-file-upload-components";

function ImageUpload() {
  return (
    <FileUploadPresetRenderer
      preset="image-upload"
      onFilesChange={(files) => console.log(files)}
    />
  );
}
```

### Config-Driven Approach

```tsx
import { FileUploadRenderer } from "dudu-file-upload-components";

const config = {
  variant: "dropzone",
  multiple: true,
  maxFiles: 5,
  accept: "image/*",
  labels: {
    dropzone: "Drop your images here",
  },
};

function ConfigDrivenUpload() {
  return (
    <FileUploadRenderer
      config={config}
      onFilesChange={(files) => console.log(files)}
    />
  );
}
```

## Example Usage Code

### Complete Component Example

```tsx
import React, { useState } from "react";
import { FileUpload, type FileWithPreview } from "dudu-file-upload-components";

function MyFileUploader() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const handleFilesChange = (newFiles: FileWithPreview[]) => {
    setFiles(newFiles);
    console.log("Files updated:", newFiles);
  };

  const handleError = (errorMessages: string[]) => {
    setErrors(errorMessages);
    console.error("Upload errors:", errorMessages);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Upload Your Files</h2>

      <FileUpload
        variant="dropzone"
        size="md"
        multiple={true}
        maxFiles={5}
        maxSize={10 * 1024 * 1024} // 10MB
        accept="image/*,application/pdf"
        onFilesChange={handleFilesChange}
        onError={handleError}
        labels={{
          dropzone: "Drop your files here or click to browse",
          dragActive: "Release to upload files",
        }}
      />

      {errors.length > 0 && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
          <h3 className="text-red-800 font-medium">Upload Errors:</h3>
          <ul className="text-red-700 text-sm mt-1">
            {errors.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </div>
      )}

      {files.length > 0 && (
        <div className="mt-4">
          <h3 className="font-medium mb-2">Uploaded Files:</h3>
          <ul className="space-y-1">
            {files.map((file) => (
              <li key={file.id} className="text-sm text-gray-600">
                {file.file.name} ({Math.round(file.file.size / 1024)}KB)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MyFileUploader;
```

### Using with Form Libraries

```tsx
import { useForm, Controller } from "react-hook-form";
import { FileUpload } from "dudu-file-upload-components";

function FormWithFileUpload() {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Form data:", data);
    // Handle form submission with files
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="files"
        control={control}
        render={({ field }) => (
          <FileUpload
            variant="dropzone"
            multiple
            onFilesChange={field.onChange}
          />
        )}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Custom Hook Usage

```tsx
import { useFileUpload } from "dudu-file-upload-components";

function CustomFileUploader() {
  const [state, actions] = useFileUpload({
    multiple: true,
    maxSize: 5 * 1024 * 1024, // 5MB
    accept: "image/*",
  });

  return (
    <div>
      <input {...actions.getInputProps()} />
      <button onClick={actions.openFileDialog}>
        Choose Files ({state.files.length} selected)
      </button>

      {state.files.map((file) => (
        <div key={file.id}>
          <span>{file.file.name}</span>
          <button onClick={() => actions.removeFile(file.id)}>Remove</button>
        </div>
      ))}

      {state.errors.map((error, index) => (
        <div key={index} className="text-red-500">
          {error}
        </div>
      ))}
    </div>
  );
}
```

## API Reference

### FileUpload Component

| Prop            | Type                                               | Default      | Description                   |
| --------------- | -------------------------------------------------- | ------------ | ----------------------------- |
| `variant`       | `"button" \| "dropzone" \| "preview" \| "compact"` | `"dropzone"` | Upload component variant      |
| `size`          | `"sm" \| "md" \| "lg"`                             | `"md"`       | Component size                |
| `radius`        | `"none" \| "sm" \| "md" \| "lg" \| "full"`         | `"md"`       | Border radius                 |
| `multiple`      | `boolean`                                          | `false`      | Allow multiple file selection |
| `maxFiles`      | `number`                                           | `1`          | Maximum number of files       |
| `maxSize`       | `number`                                           | `10MB`       | Maximum file size in bytes    |
| `accept`        | `string`                                           | `"*"`        | Accepted file types           |
| `disabled`      | `boolean`                                          | `false`      | Disable the component         |
| `showPreview`   | `boolean`                                          | `true`       | Show file previews            |
| `allowRemove`   | `boolean`                                          | `true`       | Allow file removal            |
| `onFilesChange` | `(files: FileWithPreview[]) => void`               | -            | Files change callback         |
| `onFilesAdded`  | `(files: FileWithPreview[]) => void`               | -            | Files added callback          |
| `onError`       | `(errors: string[]) => void`                       | -            | Error callback                |

### Available Presets

- `default` - Basic dropzone upload
- `image-upload` - Optimized for images with preview
- `document-upload` - For documents with file list
- `multi-file` - Multiple file upload with previews
- `compact` - Minimal button-style upload

## 📋 JSON Configuration Documentation

The component supports JSON-based configuration for dynamic behavior. This makes it easy to configure file upload components through external configuration files, APIs, or content management systems.

### Complete Configuration Schema

Here's the complete configuration schema with all available options:

```json
{
  "variant": "dropzone",
  "size": "md",
  "radius": "lg",
  "multiple": true,
  "maxFiles": 10,
  "maxSize": 52428800,
  "accept": "image/*,application/pdf",
  "disabled": false,
  "showPreview": true,
  "showProgress": false,
  "allowRemove": true,
  "labels": {
    "dropzone": "Drop files here or click to browse",
    "button": "Choose Files",
    "dragActive": "Drop files here",
    "maxFiles": "Maximum {count} files allowed",
    "maxSize": "File size must be less than {size}",
    "fileType": "File type not supported",
    "remove": "Remove file",
    "clear": "Clear all files"
  },
  "icons": {
    "upload": "upload",
    "file": "file",
    "image": "image",
    "remove": "x",
    "error": "alert-circle"
  }
}
```

### Configuration Properties

| Property       | Type                                               | Default      | Description                                     |
| -------------- | -------------------------------------------------- | ------------ | ----------------------------------------------- |
| `variant`      | `"button" \| "dropzone" \| "preview" \| "compact"` | `"dropzone"` | Upload component variant                        |
| `size`         | `"sm" \| "md" \| "lg"`                             | `"md"`       | Component size                                  |
| `radius`       | `"none" \| "sm" \| "md" \| "lg" \| "full"`         | `"md"`       | Border radius                                   |
| `multiple`     | `boolean`                                          | `false`      | Allow multiple file selection                   |
| `maxFiles`     | `number`                                           | `1`          | Maximum number of files (when multiple is true) |
| `maxSize`      | `number`                                           | `10485760`   | Maximum file size in bytes (default: 10MB)      |
| `accept`       | `string`                                           | `"*"`        | Accepted file types (MIME types or extensions)  |
| `disabled`     | `boolean`                                          | `false`      | Disable the component                           |
| `showPreview`  | `boolean`                                          | `true`       | Show file previews                              |
| `showProgress` | `boolean`                                          | `false`      | Show upload progress bars                       |
| `allowRemove`  | `boolean`                                          | `true`       | Allow file removal                              |

### Labels Configuration

All labels support placeholder replacement:

| Label        | Placeholders | Description                                  |
| ------------ | ------------ | -------------------------------------------- |
| `dropzone`   | -            | Text shown in dropzone area                  |
| `button`     | -            | Text shown on upload button                  |
| `dragActive` | -            | Text shown when dragging files over dropzone |
| `maxFiles`   | `{count}`    | Error message for too many files             |
| `maxSize`    | `{size}`     | Error message for file too large             |
| `fileType`   | -            | Error message for invalid file type          |
| `remove`     | -            | Tooltip text for remove button               |
| `clear`      | -            | Text for clear all button                    |

### 📝 Example Configurations

#### Image Gallery Upload

```json
{
  "variant": "dropzone",
  "size": "lg",
  "multiple": true,
  "maxFiles": 20,
  "maxSize": 5242880,
  "accept": "image/*",
  "showPreview": true,
  "allowRemove": true,
  "labels": {
    "dropzone": "Drop your photos here or click to browse",
    "dragActive": "Release to add photos",
    "maxFiles": "You can upload up to {count} photos",
    "maxSize": "Each photo must be smaller than {size}"
  }
}
```

#### Document Upload

```json
{
  "variant": "button",
  "size": "md",
  "multiple": true,
  "maxFiles": 10,
  "maxSize": 26214400,
  "accept": ".pdf,.doc,.docx,.txt",
  "showPreview": false,
  "labels": {
    "button": "Select Documents",
    "maxFiles": "Maximum {count} documents allowed",
    "fileType": "Only PDF, Word, and text files are supported"
  }
}
```

#### Single Avatar Upload

```json
{
  "variant": "preview",
  "size": "sm",
  "multiple": false,
  "maxFiles": 1,
  "maxSize": 2097152,
  "accept": "image/jpeg,image/png,image/webp",
  "showPreview": true,
  "allowRemove": true,
  "labels": {
    "dropzone": "Upload your avatar",
    "maxSize": "Image must be smaller than {size}",
    "fileType": "Only JPEG, PNG, and WebP images are supported"
  }
}
```

#### Compact File Upload

```json
{
  "variant": "compact",
  "size": "sm",
  "multiple": true,
  "maxFiles": 5,
  "maxSize": 10485760,
  "accept": "*",
  "showPreview": false,
  "labels": {
    "button": "Attach Files",
    "maxFiles": "Up to {count} files",
    "maxSize": "Max {size} per file"
  }
}
```

### Using JSON Configuration

```tsx
import { FileUploadJSONRenderer } from "dudu-file-upload-components";

// Load configuration from API, file, or CMS
const config = await fetch("/api/upload-config").then((res) => res.json());

function DynamicFileUpload() {
  return (
    <FileUploadJSONRenderer
      configJSON={JSON.stringify(config)}
      onFilesChange={(files) => console.log(files)}
      onConfigError={(error) => console.error("Config error:", error)}
      fallbackPreset="default"
    />
  );
}
```

## Advanced Usage

### Custom Hook

```tsx
import { useFileUpload } from "dudu-file-upload-components";

function CustomUpload() {
  const [state, actions] = useFileUpload({
    multiple: true,
    maxSize: 5 * 1024 * 1024, // 5MB
    accept: "image/*",
  });

  return (
    <div>
      <input {...actions.getInputProps()} />
      <button onClick={actions.openFileDialog}>Upload Files</button>
      {state.files.map((file) => (
        <div key={file.id}>
          {file.file.name}
          <button onClick={() => actions.removeFile(file.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}
```

### Live Configuration

```tsx
import {
  useFileUploadConfig,
  FileUploadRenderer,
} from "dudu-file-upload-components";

function LiveConfigExample() {
  const { config, updateConfig, exportConfig } = useFileUploadConfig();

  return (
    <div>
      <button onClick={() => updateConfig({ multiple: !config.multiple })}>
        Toggle Multiple
      </button>
      <FileUploadRenderer config={config} />
      <pre>{exportConfig()}</pre>
    </div>
  );
}
```

## Styling

The components use TailwindCSS classes and CSS custom properties. You can customize the appearance by:

1. **Using the built-in variants and sizes**
2. **Overriding CSS custom properties**
3. **Passing custom className props**
4. **Using the configuration system**

## TypeScript Support

Full TypeScript support with comprehensive type definitions:

```tsx
import type {
  FileUploadConfig,
  FileWithPreview,
  FileUploadPreset,
} from "dudu-file-upload-components";
```

## Publishing to NPM

### Building the Package

Before publishing, build the package for distribution:

```bash
# Build the library for distribution
npm run build:lib

# Build the demo site (for development/testing)
npm run build

# Run the development server
npm run dev
```

The build process:

1. **TypeScript Compilation**: Compiles TypeScript to JavaScript with type definitions
2. **Bundling**: Uses Rollup to create optimized bundles for both CommonJS and ES modules
3. **CSS Processing**: Processes and optimizes CSS/TailwindCSS styles
4. **Tree Shaking**: Removes unused code for smaller bundle sizes

### Publishing to NPM

1. **Prepare for Publishing**

   ```bash
   # Update version in package.json
   npm version patch  # or minor/major

   # Build the package
   npm run build:lib
   ```

2. **Publish to NPM**

   ```bash
   # Login to NPM (first time only)
   npm login

   # Publish the package
   npm publish

   # For scoped packages (like dudu-file-upload-components)
   npm publish --access public
   ```

3. **Verify Publication**
   ```bash
   # Check if package is published
   npm view dudu-file-upload-components
   ```

### Using in Your Project

Once published to NPM, you can use the package in any React project:

#### 1. Install the Package

```bash
npm install dudu-file-upload-components
```

#### 2. Install Required Peer Dependencies

```bash
npm install react react-dom lucide-react class-variance-authority clsx @radix-ui/react-slot
```

#### 3. Configure TailwindCSS

Add the package path to your `tailwind.config.js`:

```js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/dudu-file-upload-components/**/*.{js,ts,jsx,tsx}",
  ],
  // ... rest of your config
};
```

#### 4. Use in Your Components

```tsx
import { FileUpload } from "dudu-file-upload-components";

function MyApp() {
  return (
    <FileUpload
      variant="dropzone"
      multiple
      onFilesChange={(files) => console.log(files)}
    />
  );
}
```

### Package Distribution

The package includes:

- **ES Modules**: `dist/index.esm.js`
- **CommonJS**: `dist/index.js`
- **TypeScript Definitions**: `dist/index.d.ts`
- **Styles**: `dist/styles.css` (if needed)

### Local Development

For local development and testing:

```bash
# Pack the package locally
npm pack

# Install in another project
cd /path/to/your-project
npm install /path/to/dudu-file-upload-components-0.1.0.tgz
```

## Testing

The component library includes comprehensive testing to ensure reliability and functionality.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Structure

The test suite covers:

- **Unit Tests**: Individual component functionality
- **Integration Tests**: Component interactions and workflows
- **Accessibility Tests**: Screen reader and keyboard navigation
- **Visual Regression Tests**: UI consistency across changes

### Writing Tests

When contributing, please include tests for:

```tsx
// Example test structure
import { render, screen, fireEvent } from "@testing-library/react";
import { FileUpload } from "dudu-file-upload-components";

describe("FileUpload", () => {
  it("should handle file selection", () => {
    const handleFilesChange = jest.fn();
    render(<FileUpload onFilesChange={handleFilesChange} />);

    const input = screen.getByRole("button");
    // Test file upload functionality
  });
});
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [dudu](https://github.com/dudu)

## Demo

Visit the demo at `/demo` route when running the development server to see all variants and configuration options in action.

```bash
npm run dev
# Open http://localhost:3000/demo
```

## 🔧 Troubleshooting

### Common Issues

#### Styles Not Applied

1. **Import the CSS file** in your main application file (this is required):

```tsx
import "dudu-file-upload-components/dist/style.css";
```

2. **If using TailwindCSS**, add the package path to your `tailwind.config.js`:

```js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/dudu-file-upload-components/**/*.{js,ts,jsx,tsx}",
  ],
  // ... rest of config
};
```

**Note**: The CSS file contains all necessary styles and will work even without TailwindCSS in your project.

#### TypeScript Errors

Ensure you have the correct type definitions installed:

```bash
npm install @types/react @types/react-dom
```

#### Peer Dependency Warnings

Install all required peer dependencies:

```bash
npm install react react-dom lucide-react class-variance-authority clsx @radix-ui/react-slot
```

#### Component Not Rendering

1. Check that you've imported the CSS file
2. Verify all peer dependencies are installed
3. Ensure your React version is 16.8 or higher
4. Check the browser console for any error messages

### Best Practices

1. **File Validation**: Always validate files on both client and server side
2. **Error Handling**: Implement proper error handling for upload failures
3. **Progress Tracking**: Use the built-in progress features for better UX
4. **Accessibility**: Test with screen readers and keyboard navigation
5. **Performance**: Consider lazy loading for large file previews

### Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **File API**: Required for drag & drop functionality
- **ES2017**: Minimum JavaScript support level

## ✅ Testing Your Installation

After installing the package, you can test it with this simple component:

```tsx
import React from "react";
import { FileUpload } from "dudu-file-upload-components";
import "dudu-file-upload-components/dist/style.css";

function TestFileUpload() {
  const handleFilesChange = (files) => {
    console.log("Files selected:", files);
  };

  return (
    <div className="p-8">
      <h2 className="text-xl font-semibold mb-4">Test File Upload</h2>
      <FileUpload
        variant="dropzone"
        multiple={true}
        maxFiles={3}
        onFilesChange={handleFilesChange}
      />
    </div>
  );
}

export default TestFileUpload;
```

If the component renders correctly and you can select files, your installation is working properly!
