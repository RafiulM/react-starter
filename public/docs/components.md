# Component Library

Our UI component library provides a comprehensive set of accessible, customizable components built with Tailwind CSS and Radix UI.

## Button Component

The Button component supports multiple variants and sizes.

### Usage

```tsx
import { Button } from "@repo/ui";

function MyComponent() {
  return (
    <div>
      <Button>Default Button</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
    </div>
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default"` \| `"secondary"` \| `"outline"` \| `"ghost"` | `"default"` | Button appearance |
| `size` | `"sm"` \| `"md"` \| `"lg"` | `"md"` | Button size |
| `disabled` | `boolean` | `false` | Disable the button |

## Card Component

Cards provide a flexible container for content.

### Usage

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@repo/ui";

function MyCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Card content goes here.</p>
      </CardContent>
    </Card>
  );
}
```

## Input Component

Form input with built-in validation styles.

### Usage

```tsx
import { Input } from "@repo/ui";

function MyForm() {
  return (
    <form>
      <Input
        type="email"
        placeholder="Enter your email"
        required
      />
      <Input
        type="password"
        placeholder="Password"
        required
      />
    </form>
  );
}
```

## Dialog Component

Modal dialogs for user interactions.

### Usage

```tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@repo/ui";

function MyDialog() {
  return (
    <Dialog>
      <DialogTrigger>Open Dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
        </DialogHeader>
        <p>Dialog content here.</p>
      </DialogContent>
    </Dialog>
  );
}
```

## Customization

All components support custom className props and can be styled with Tailwind CSS:

```tsx
<Button className="bg-red-500 hover:bg-red-600">
  Custom Styled Button
</Button>
```

## Theming

Components automatically adapt to your theme configuration in `tailwind.config.js`.

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3b82f6',
          foreground: '#ffffff',
        },
      },
    },
  },
}
```