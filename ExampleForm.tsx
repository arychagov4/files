import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Box, Typography } from '@mui/material';
import { TreeViewBaseItem } from '@mui/x-tree-view/models';
import { TreeSelectInput } from './TreeSelectInput';

// Example tree data structure
const treeItems: TreeViewBaseItem[] = [
  {
    id: 'electronics',
    label: 'Electronics',
    children: [
      {
        id: 'computers',
        label: 'Computers',
        children: [
          { id: 'laptop', label: 'Laptops' },
          { id: 'desktop', label: 'Desktops' },
          { id: 'tablet', label: 'Tablets' },
        ],
      },
      {
        id: 'phones',
        label: 'Phones',
        children: [
          { id: 'smartphone', label: 'Smartphones' },
          { id: 'feature-phone', label: 'Feature Phones' },
        ],
      },
    ],
  },
  {
    id: 'clothing',
    label: 'Clothing',
    children: [
      {
        id: 'mens',
        label: "Men's Clothing",
        children: [
          { id: 'mens-shirts', label: 'Shirts' },
          { id: 'mens-pants', label: 'Pants' },
        ],
      },
      {
        id: 'womens',
        label: "Women's Clothing",
        children: [
          { id: 'womens-dresses', label: 'Dresses' },
          { id: 'womens-tops', label: 'Tops' },
        ],
      },
    ],
  },
  {
    id: 'books',
    label: 'Books',
    children: [
      { id: 'fiction', label: 'Fiction' },
      { id: 'non-fiction', label: 'Non-Fiction' },
      { id: 'educational', label: 'Educational' },
    ],
  },
];

interface FormData {
  category: string;
  department: string;
}

export function ExampleForm() {
  const { control, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      category: '',
      department: '',
    },
  });

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    alert(`Selected:\nCategory: ${data.category}\nDepartment: ${data.department}`);
  };

  // Watch form values to display them
  const watchedValues = watch();

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Tree Select Input Example
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ mb: 3 }}>
          <TreeSelectInput
            name="category"
            control={control}
            label="Product Category"
            items={treeItems}
            placeholder="Choose a category"
            required
            helperText="Select a category from the tree"
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <TreeSelectInput
            name="department"
            control={control}
            label="Department"
            items={treeItems}
            placeholder="Choose a department"
          />
        </Box>

        <Button type="submit" variant="contained" fullWidth>
          Submit
        </Button>
      </form>

      <Box sx={{ mt: 4, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
        <Typography variant="h6" gutterBottom>
          Current Form Values:
        </Typography>
        <pre>{JSON.stringify(watchedValues, null, 2)}</pre>
      </Box>
    </Box>
  );
}
