# ReactJS TDD with msw

# Commands - `get`, `query` and `find`

- `get`: expect element to be in DOM
- `query`: expect element **NOT** to be in DOM
- `find`: expect element to appear **async** ie **await** is necessary

# Notes

### Testing custom hooks

When there is a change in state in custom hooks, assertion needs to be made on this change otherwise, warning `When testing, code that causes React state updates should be wrapped into act(...):` will appear.

This throws warning:

```ts
// useInitialisation.test.tsx
it("should return true on load and false when initialisation completes", async () => {
    const { result } = renderHook(() => useInitialisation());

    expect(result.current.isLoading).toBe(true);
});
```

This does not throw warning:

```ts
// useInitialisation.test.tsx
it("should return true on load and false when initialisation completes", async () => {
    const { result } = renderHook(() => useInitialisation());

    expect(result.current.isLoading).toBe(true);
    await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
    });
});
```