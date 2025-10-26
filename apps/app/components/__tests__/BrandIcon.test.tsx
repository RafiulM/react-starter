/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrandIcon } from "../BrandIcon";

describe("BrandIcon", () => {
  it("renders with default props", () => {
    render(<BrandIcon />);

    const icon = screen.getByRole("img");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("aria-label", "Console application logo");
    expect(icon).toHaveAttribute("title", "Console application logo");
    expect(icon).toHaveClass("w-8", "h-8");
  });

  it("renders with custom aria-label", () => {
    render(<BrandIcon ariaLabel="Custom brand icon" />);

    const icon = screen.getByRole("img");
    expect(icon).toHaveAttribute("aria-label", "Custom brand icon");
    expect(icon).toHaveAttribute("title", "Custom brand icon");
  });

  it("renders with different sizes", () => {
    const { rerender } = render(<BrandIcon size="sm" />);
    let icon = screen.getByRole("img");
    expect(icon).toHaveClass("w-6", "h-6");

    rerender(<BrandIcon size="md" />);
    icon = screen.getByRole("img");
    expect(icon).toHaveClass("w-8", "h-8");

    rerender(<BrandIcon size="lg" />);
    icon = screen.getByRole("img");
    expect(icon).toHaveClass("w-10", "h-10");
  });

  it("renders with custom className", () => {
    render(<BrandIcon className="custom-class another-class" />);

    const icon = screen.getByRole("img");
    expect(icon).toHaveClass("w-8", "h-8", "custom-class", "another-class");
  });

  it("has proper SVG structure", () => {
    render(<BrandIcon />);

    const icon = screen.getByRole("img");
    expect(icon).toHaveAttribute("viewBox", "0 0 32 32");
    expect(icon).toHaveAttribute("fill", "none");
    expect(icon).toHaveAttribute("xmlns", "http://www.w3.org/2000/svg");
  });

  it("includes gradient definitions", () => {
    render(<BrandIcon />);

    const icon = screen.getByRole("img");
    const defs = icon.querySelector("defs");
    expect(defs).toBeInTheDocument();

    const gradients = defs?.querySelectorAll("linearGradient");
    expect(gradients).toHaveLength(2);
    expect(gradients?.[0]).toHaveAttribute("id", "brandGradient");
    expect(gradients?.[1]).toHaveAttribute("id", "accentGradient");
  });

  it("includes proper geometric shapes", () => {
    render(<BrandIcon />);

    const icon = screen.getByRole("img");

    // Check for main circle
    const mainCircle = icon.querySelector("circle");
    expect(mainCircle).toBeInTheDocument();
    expect(mainCircle).toHaveAttribute("cx", "16");
    expect(mainCircle).toHaveAttribute("cy", "16");
    expect(mainCircle).toHaveAttribute("r", "14");

    // Check for path elements
    const paths = icon.querySelectorAll("path");
    expect(paths.length).toBeGreaterThan(0);
  });

  it("has proper accessibility attributes", () => {
    render(<BrandIcon ariaLabel="Accessible brand icon" />);

    const icon = screen.getByRole("img");
    expect(icon).toHaveAttribute("aria-label");
    expect(icon).toHaveAttribute("title");
  });

  it("maintains aspect ratio and is responsive", () => {
    render(<BrandIcon />);

    const icon = screen.getByRole("img");

    // Check that viewBox is set for proper aspect ratio
    expect(icon).toHaveAttribute("viewBox", "0 0 32 32");

    // Check that width and height are equal
    expect(icon).toHaveClass(/w-\d+/);
    expect(icon).toHaveClass(/h-\d+/);

    const widthClass = Array.from(icon.classList).find(c => c.startsWith("w-"));
    const heightClass = Array.from(icon.classList).find(c => c.startsWith("h-"));
    expect(widthClass).toBe(heightClass?.replace("h-", "w-"));
  });
});