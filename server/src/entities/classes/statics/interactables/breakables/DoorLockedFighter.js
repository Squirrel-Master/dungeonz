const Breakable = require("./Breakable");

class DoorLockedFighter extends Breakable {
    interaction(interactedBy, toolUsed) {
        // Don't do anything to this door if it is not active.
        if (this.activeState === false) return;

        // Don't do anything if no tool was used. Might have been walked into.
        if (toolUsed === undefined) return;

        // Don't do anything to this node if the wrong tool has been used on it.
        if (toolUsed.category !== this.toolCategory) {
            // Tell the player if they are using the wrong tool.
            interactedBy.socket.sendEvent(this.warningEvent);
            return;
        }

        // Check any task progress was made.
        interactedBy.tasks.progressTask(this.taskIdInteracted);

        // The door is now open, so stop it from blocking players.
        this.deactivate();

        this.blocking = false;
    }

    activate() {
        super.activate();
        // If the door was successfully activated (nothing standing on the open door), make it block things.
        if (this.activeState === true) this.blocking = true;
    }
}
module.exports = DoorLockedFighter;

DoorLockedFighter.prototype.reactivationRate = 5000;
DoorLockedFighter.prototype.toolCategory = require("../../../../../items/classes/Item").prototype.categories.FighterKey;
