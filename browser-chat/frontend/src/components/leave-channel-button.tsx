import {
  AdaptiveDialog,
  AdaptiveDialogContent,
  AdaptiveDialogDescription,
  AdaptiveDialogHeader,
  AdaptiveDialogTitle,
  AdaptiveDialogTrigger,
} from "@/components/ui/adaptive-dialog"
import { Button } from "@/components/ui/button"

interface LeaveChannelProps {
  onConfirm: () => void
}
export function LeaveChannelButton({ onConfirm }: LeaveChannelProps) {
  return (
    <AdaptiveDialog>
      <AdaptiveDialogTrigger>
        <Button size="sm" variant="destructive">Leave channel</Button>
      </AdaptiveDialogTrigger>
      <AdaptiveDialogContent>
        <AdaptiveDialogHeader>
          <AdaptiveDialogTitle>
            Are you sure?
          </AdaptiveDialogTitle>
          <AdaptiveDialogDescription>
            If you want to rejoin the channel, make sure to save a ticket first by clicking the <em>Invite</em> button.
          </AdaptiveDialogDescription>
        </AdaptiveDialogHeader>
        <Button onClick={onConfirm}>Leave channel</Button>
      </AdaptiveDialogContent>
    </AdaptiveDialog>
  )
}
