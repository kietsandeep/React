import DsaWorkspace from "@/features/workspace/components/DsaWorkspace/DsaWorkspace";
import OutputWorkspace from "@/features/workspace/components/OutputWorkspace/OutputWorkspace";

// Maps a problem's `kind` (from its JSON) to the workspace UI that solves it.
// New question type? Build the component, register it here, set "kind" in the data. Anything unknown uses the React UI workspace.
export const WORKSPACES = {
  function: DsaWorkspace,
  output: OutputWorkspace,
};
