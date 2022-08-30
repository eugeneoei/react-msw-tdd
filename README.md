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

### Test functionality > unit testing ??

<!-- Testing functionality of the main component instead of unit testing smaller components since tests on main component should already have covered the funtionality of the smaller components. Smaller components does not just refer to `jsx`, it also refers to custom hooks or contexts. -->

# Important

- [`AbortController`](https://axios-http.com/docs/cancellation)

# Articles & References

- [What do we recommend people do for elements that have no implicit role (like input[type=password])](https://github.com/testing-library/dom-testing-library/issues/567)