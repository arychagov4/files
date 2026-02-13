# Tree Select Input Component

A reusable single-select tree view input component for React forms using Material-UI v7 and react-hook-form.

## Prerequisites

Make sure you have these dependencies installed:

```bash
npm install @mui/material @mui/x-tree-view react-hook-form
# or
yarn add @mui/material @mui/x-tree-view react-hook-form
```

## Installation

1. Copy `TreeSelectInput.tsx` to your components folder
2. Import and use in your forms (see `ExampleForm.tsx` for reference)

## Basic Usage

```tsx
import { useForm } from 'react-hook-form';
import { TreeSelectInput } from './TreeSelectInput';

interface FormData {
  category: string;
}

function MyForm() {
  const { control, handleSubmit } = useForm<FormData>();

  const treeItems = [
    {
      id: 'parent',
      label: 'Parent',
      children: [
        { id: 'child1', label: 'Child 1' },
        { id: 'child2', label: 'Child 2' },
      ],
    },
  ];

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <TreeSelectInput
        name="category"
        control={control}
        label="Select Category"
        items={treeItems}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | Yes | Field name for react-hook-form |
| `control` | `Control` | Yes | Control object from useForm() |
| `label` | `string` | Yes | Label text for the input |
| `items` | `TreeViewBaseItem[]` | Yes | Tree structure data |
| `placeholder` | `string` | No | Placeholder text (default: "Select an option") |
| `required` | `boolean` | No | Whether field is required (default: false) |
| `disabled` | `boolean` | No | Whether input is disabled (default: false) |
| `error` | `boolean` | No | Whether to show error state (default: false) |
| `helperText` | `string` | No | Helper text below input (default: "") |

## Tree Item Structure

Each tree item should follow the `TreeViewBaseItem` interface:

```tsx
interface TreeViewBaseItem {
  id: string;           // Unique identifier
  label: string;        // Display text
  children?: TreeViewBaseItem[];  // Optional nested items
}
```

## Features

- ✅ Single selection from hierarchical tree
- ✅ Full react-hook-form integration
- ✅ TypeScript support
- ✅ Material-UI v7 compatible
- ✅ Validation support
- ✅ Keyboard navigation
- ✅ Accessible
- ✅ Expandable/collapsible nodes
- ✅ Search/filter capability (via Autocomplete)

## Tips

1. **Unique IDs**: Ensure all tree item IDs are unique across the entire tree
2. **Validation**: Use react-hook-form's rules for custom validation
3. **Dynamic Data**: Items can be loaded from API - just pass the data structure
4. **Styling**: Customize appearance using MUI's `sx` prop or theme

## Example Tree Data

```tsx
const departments = [
  {
    id: 'engineering',
    label: 'Engineering',
    children: [
      { id: 'frontend', label: 'Frontend' },
      { id: 'backend', label: 'Backend' },
      {
        id: 'mobile',
        label: 'Mobile',
        children: [
          { id: 'ios', label: 'iOS' },
          { id: 'android', label: 'Android' },
        ],
      },
    ],
  },
  {
    id: 'sales',
    label: 'Sales',
    children: [
      { id: 'enterprise', label: 'Enterprise' },
      { id: 'smb', label: 'SMB' },
    ],
  },
];
```

## Troubleshooting

**Issue**: Tree doesn't show up
- Make sure `@mui/x-tree-view` is installed
- Check that your tree items have valid structure

**Issue**: Can't select items
- Verify item IDs are unique strings
- Check that `control` prop is passed correctly

**Issue**: Validation not working
- Ensure you're using the `required` prop or react-hook-form rules
- Check that form submission is properly configured
