import React, { useState } from 'react';
import {
  Autocomplete,
  TextField,
  Popper,
  Paper,
  Box,
} from '@mui/material';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { TreeViewBaseItem } from '@mui/x-tree-view/models';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';

interface TreeSelectInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  items: TreeViewBaseItem[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
}

export function TreeSelectInput<T extends FieldValues>({
  name,
  control,
  label,
  items,
  placeholder = 'Select an option',
  required = false,
  disabled = false,
  error = false,
  helperText = '',
}: TreeSelectInputProps<T>) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // Flatten tree structure to find item by ID
  const flattenTree = (nodes: TreeViewBaseItem[]): TreeViewBaseItem[] => {
    return nodes.reduce((acc: TreeViewBaseItem[], node) => {
      acc.push(node);
      if (node.children) {
        acc.push(...flattenTree(node.children));
      }
      return acc;
    }, []);
  };

  const flatItems = flattenTree(items);

  // Find item by ID
  const findItemById = (id: string): TreeViewBaseItem | undefined => {
    return flatItems.find((item) => item.id === id);
  };

  // Get display label for selected item
  const getDisplayLabel = (selectedId: string | null): string => {
    if (!selectedId) return '';
    const item = findItemById(selectedId);
    return item?.label || '';
  };

  // Custom Popper to render the tree view
  const CustomPopper = (props: any) => {
    return (
      <Popper {...props} placement="bottom-start" style={{ width: props.style.width }}>
        <Paper elevation={8} sx={{ mt: 1, maxHeight: 400, overflow: 'auto' }}>
          {props.children}
        </Paper>
      </Popper>
    );
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? `${label} is required` : false }}
      render={({ field, fieldState: { error: fieldError } }) => (
        <Autocomplete
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          value={field.value || null}
          onChange={(_, newValue) => {
            field.onChange(newValue);
            setOpen(false);
          }}
          inputValue={inputValue}
          onInputChange={(_, newInputValue, reason) => {
            // Only update input value when user types, not when selecting
            if (reason === 'input') {
              setInputValue(newInputValue);
            }
          }}
          disabled={disabled}
          options={[]} // We don't use options, we use the tree view
          getOptionLabel={() => getDisplayLabel(field.value)}
          PopperComponent={CustomPopper}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              placeholder={placeholder}
              required={required}
              error={error || !!fieldError}
              helperText={helperText || fieldError?.message}
              InputProps={{
                ...params.InputProps,
                // Show the selected item label, not the input value
                value: getDisplayLabel(field.value),
              }}
            />
          )}
          renderOption={() => (
            <Box sx={{ width: '100%' }}>
              <RichTreeView
                items={items}
                selectedItems={field.value}
                onSelectedItemsChange={(_, itemId) => {
                  if (itemId) {
                    field.onChange(itemId);
                    setInputValue('');
                    setOpen(false);
                  }
                }}
                sx={{
                  flexGrow: 1,
                  maxHeight: 350,
                  overflowY: 'auto',
                  '& .MuiTreeItem-content': {
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  },
                }}
              />
            </Box>
          )}
          // Disable filtering since we're using a tree view
          filterOptions={(x) => x}
          freeSolo={false}
        />
      )}
    />
  );
}