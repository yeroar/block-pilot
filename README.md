# Block Pilot

## Overview
Block Pilot is a React Native application built with Expo, featuring a comprehensive design system integration using Figma's Code Connect. The project is architected to support scalable, reusable components with seamless design-to-code workflows.

## Project Structure
```
block-pilot/
├── components/
│   └── controls/
│       └── button.tsx          # Main Button component implementation
├── cc-components/
│   └── button.figma.tsx        # Code Connect mapping file (auto-generated)
├── hooks/                      # Custom React hooks
├── theme/                      # Theme configuration and design tokens
├── App.js                      # Application entry point
├── figma.config.json          # Code Connect configuration
└── package.json               # Dependencies and scripts
```

## Key Features
- **🎨 Design System Integration**: Seamless connection between Figma designs and React Native code using Code Connect
- **🔧 Customizable Components**: Feature-rich Button component with multiple variants, roles, and shapes
- **💅 Advanced Styling**: React Native Unistyles for type-safe, theme-aware styling
- **♿ Accessibility**: Built-in accessibility support with proper ARIA roles and keyboard navigation
- **🚀 Performance**: Optimized components with forwardRef and proper memoization

## Tech Stack
- **Framework**: React Native with Expo
- **Styling**: React Native Unistyles
- **Design Integration**: Figma Code Connect
- **TypeScript**: Full type safety throughout the codebase
- **Development**: Expo Dev Tools for debugging and testing

## Quick Start

### Prerequisites
- Node.js 18 or newer
- Expo CLI
- Figma personal access token with Code Connect (Write) and File content (Read-only) scopes

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Set up Code Connect integration:
   ```bash
   npx figma connect --token=YOUR_PERSONAL_ACCESS_TOKEN
   ```

### Code Connect Setup
The interactive setup will guide you through:
1. Configuring your component directory structure
2. Linking your Figma design system file
3. Creating prop mappings between Figma and code components
4. Generating Code Connect files

## Component Architecture

### Button Component
The Button component showcases best practices for React Native component design:

```tsx
// Example usage
<Button
  label={{ children: "Click me" }}
  variant="solid"
  role="primary"
  size="md"
  shape="rounded"
  onPress={() => console.log('Button pressed')}
/>
```

**Supported Props:**
- `variant`: `solid`, `outline`, `ghost`, `blur`, `link`
- `role`: `primary`, `destructive`, `cancel`
- `size`: `xs`, `sm`, `md`, `lg`
- `shape`: `circle`, `rounded`, `capsule`
- `isLoading`: Boolean for loading state
- `isDisabled`: Boolean for disabled state

## Development Workflow

### Publishing Code Connect Files
After making changes to your components, publish the updates to Figma:
```bash
npx figma connect publish
```

### Adding New Components
1. Create the React Native component in `components/`
2. Run Code Connect setup to map it to Figma
3. Publish the mapping files

## Best Practices for Contributors

### Component Development
- **Type Safety**: Always use TypeScript with proper prop interfaces
- **Accessibility**: Include proper accessibility props and roles
- **Performance**: Use `forwardRef` for ref forwarding and proper memoization
- **Styling**: Leverage the theme system and design tokens via Unistyles

### Code Connect Integration
- **Design Fidelity**: Ensure components match Figma designs precisely
- **Prop Mapping**: Map Figma properties to meaningful component props
- **Documentation**: Keep Code Connect files updated with component changes

## Environment Configuration
Store sensitive information in environment variables:
```bash
# .env
FIGMA_ACCESS_TOKEN=your_personal_access_token_here
```

## Troubleshooting

### Common Issues
- **Module not found**: Ensure `@figma/code-connect` is installed
- **Token errors**: Verify your Figma personal access token has correct scopes
- **Type errors**: Check that all dependencies are properly installed

## Contributing
We welcome contributions! Please:
1. Fork the repository
2. Create a feature branch
3. Follow the coding standards
4. Test your changes thoroughly
5. Submit a pull request

## License
This project is private and proprietary.

---

# React Native Development Guidelines

## Component Development Best Practices

### ✅ Recommended Patterns

#### Type-Safe Props
```tsx
// Define clear, semantic prop interfaces
export type ButtonProps = {
  variant?: "solid" | "outline" | "ghost" | "blur" | "link";
  role?: "primary" | "destructive" | "cancel";
  size?: "xs" | "sm" | "md" | "lg";
  isLoading?: boolean;
  isDisabled?: boolean;
  onPress?: () => void;
};
```

#### Theme Integration
```tsx
// Use the theme system consistently
const theme = useTheme({ animate: props.animate });

const styles = StyleSheet.create((theme) => ({
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.radius.button,
  }
}));
```

#### Accessibility First
```tsx
<Pressable
  accessibilityRole="button"
  accessibilityLabel="Submit form"
  accessibilityHint="Submits the current form data"
  accessibilityState={{ disabled: isDisabled }}
>
  {children}
</Pressable>
```

### ❌ Anti-Patterns to Avoid

#### Hardcoded Values
```tsx
// DON'T DO THIS
<View style={{ backgroundColor: '#007AFF', padding: 16 }} />

// DO THIS INSTEAD
<View style={styles.container} />
// With theme-based styling
```

#### Direct Style Objects
```tsx
// AVOID
const buttonStyle = {
  backgroundColor: 'blue',
  padding: 10,
};

// PREFER
const styles = StyleSheet.create((theme) => ({
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.sm,
  }
}));
```

## Design System Integration

### Figma to Code Workflow
1. **Extract Design Data**: Use Figma MCP tools to get component specifications
2. **Map Properties**: Align Figma variants with React Native props
3. **Implement Components**: Build type-safe, accessible components
4. **Connect with Code Connect**: Link implementations back to Figma
5. **Publish & Iterate**: Make updates visible in Dev Mode

### Code Connect File Structure
```tsx
// button.figma.tsx
import figma from "@figma/code-connect";
import { Button } from "../components/controls/button";

figma.connect(Button, "FIGMA_NODE_ID", {
  props: {
    variant: figma.enum("Variant", {
      Primary: "solid",
      Secondary: "outline",
      Ghost: "ghost",
    }),
    size: figma.enum("Size", {
      Small: "sm",
      Medium: "md", 
      Large: "lg",
    }),
    disabled: figma.boolean("Disabled"),
  },
  example: (props) => (
    <Button
      variant={props.variant}
      size={props.size}
      isDisabled={props.disabled}
      label={{ children: "Button Text" }}
    />
  ),
});
```

## Styling Guidelines

### React Native Unistyles Usage
```tsx
// Define theme-aware styles
const styles = StyleSheet.create((theme) => ({
  container: {
    variants: {
      size: {
        sm: { padding: theme.spacing.sm },
        md: { padding: theme.spacing.md },
        lg: { padding: theme.spacing.lg },
      },
      variant: {
        solid: { backgroundColor: theme.colors.primary },
        outline: { 
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: theme.colors.primary,
        },
      },
    },
    compoundVariants: [
      {
        variant: 'solid',
        size: 'lg',
        styles: {
          paddingVertical: theme.spacing.lg,
          fontSize: theme.typography.headline.fontSize,
        },
      },
    ],
  },
}));
```

### Theme Structure
Your theme should include:
- **Colors**: Primary, secondary, error, background variations
- **Spacing**: Consistent spacing scale (xs, sm, md, lg, xl)
- **Typography**: Font sizes, weights, line heights
- **Radius**: Border radius values for different component types
- **Shadows**: Elevation and shadow definitions

## Testing Strategies

### Component Testing
```tsx
// Example test structure
describe('Button Component', () => {
  it('renders with correct accessibility props', () => {
    render(<Button label={{ children: 'Test' }} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('applies correct styles for variants', () => {
    const { rerender } = render(
      <Button variant="solid" label={{ children: 'Test' }} />
    );
    // Assert solid variant styles
    
    rerender(<Button variant="outline" label={{ children: 'Test' }} />);
    // Assert outline variant styles
  });
});
```

## Performance Optimization

### Component Optimization
- Use `React.memo()` for pure components
- Implement `forwardRef` for ref forwarding
- Optimize style calculations with `useMemo`
- Minimize re-renders with proper dependency arrays

### Memory Management
- Clean up subscriptions and timers
- Optimize image loading and caching
- Use lazy loading for heavy components
- Profile performance with React DevTools

---

*This documentation is maintained alongside the codebase. Please keep it updated as the project evolves.*
