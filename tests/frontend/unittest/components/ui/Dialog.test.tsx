/** @jsxImportSource @/test-utils */
import { render, screen, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

describe("Dialog", () => {
  it("renders trigger button", () => {
    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Test Dialog</DialogTitle>
        </DialogContent>
      </Dialog>
    )
    expect(screen.getByRole("button", { name: "Open Dialog" })).toBeInTheDocument()
  })

  it("opens dialog with controlled state", async () => {
    render(
      <Dialog open={true}>
        <DialogContent>
          <DialogTitle>Test Dialog</DialogTitle>
          <DialogDescription>This is a test dialog</DialogDescription>
        </DialogContent>
      </Dialog>
    )

    await waitFor(() => {
      expect(screen.getByText("Test Dialog")).toBeInTheDocument()
    })
  })

  it("displays title and description", async () => {
    render(
      <Dialog open={true}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>Dialog Description</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )

    await waitFor(() => {
      expect(screen.getByText("Dialog Title")).toBeInTheDocument()
      expect(screen.getByText("Dialog Description")).toBeInTheDocument()
    })
  })

  it("shows close button by default", async () => {
    render(
      <Dialog open={true}>
        <DialogContent>
          <DialogTitle>Test Dialog</DialogTitle>
        </DialogContent>
      </Dialog>
    )

    await waitFor(() => {
      const closeButton = screen.getByRole("dialog").querySelector("button[data-slot='dialog-close']")
      expect(closeButton).toBeInTheDocument()
    })
  })

  it("hides close button when showCloseButton is false", async () => {
    render(
      <Dialog open={true}>
        <DialogContent showCloseButton={false}>
          <DialogTitle>Test Dialog</DialogTitle>
        </DialogContent>
      </Dialog>
    )

    await waitFor(() => {
      expect(screen.queryByLabelText("Close")).not.toBeInTheDocument()
    })
  })

  it("renders footer with buttons", async () => {
    render(
      <Dialog open={true}>
        <DialogContent>
          <DialogTitle>Test Dialog</DialogTitle>
          <DialogFooter>
            <Button variant="outline">Cancel</Button>
            <Button>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument()
      expect(screen.getByRole("button", { name: "Confirm" })).toBeInTheDocument()
    })
  })

  it("renders footer with close button when showCloseButton is true", async () => {
    render(
      <Dialog open={true}>
        <DialogContent showCloseButton={false}>
          <DialogTitle>Test Dialog</DialogTitle>
          <DialogFooter showCloseButton>
            <Button>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument()
      expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument()
    })
  })

  it("applies custom className to components", async () => {
    render(
      <Dialog open={true}>
        <DialogContent className="custom-content">
          <DialogTitle>Test Dialog</DialogTitle>
          <DialogHeader className="custom-header">
            <DialogTitle className="custom-title">Title</DialogTitle>
          </DialogHeader>
          <DialogDescription className="custom-description">Description</DialogDescription>
          <DialogFooter className="custom-footer">Footer</DialogFooter>
        </DialogContent>
      </Dialog>
    )

    await waitFor(() => {
      const dialogContent = screen.getByRole("dialog")
      expect(dialogContent).toHaveClass("custom-content")

      const header = dialogContent.querySelector("[data-slot='dialog-header']")
      expect(header).toHaveClass("custom-header")

      const footer = dialogContent.querySelector("[data-slot='dialog-footer']")
      expect(footer).toHaveClass("custom-footer")
    })
  })

  it("renders children content in DialogContent", async () => {
    render(
      <Dialog open={true}>
        <DialogContent>
          <DialogTitle>Test Dialog</DialogTitle>
          <div className="p-4">Custom Content</div>
        </DialogContent>
      </Dialog>
    )

    await waitFor(() => {
      expect(screen.getByText("Custom Content")).toBeInTheDocument()
    })
  })
})