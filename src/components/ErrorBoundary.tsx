// src/components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Alert, Button, Box, Typography } from '@mui/material';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Box className="p-4">
          <Alert severity="error" className="mb-4">
            <Typography variant="h6">Something went wrong</Typography>
            <Typography>{this.state.error?.message}</Typography>
          </Alert>
          <Button 
            variant="contained" 
            onClick={() => this.setState({ hasError: false })}
          >
            Try again
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}
