import AddCollaboratorDto from './add-collaborator.dto';

/**
 * Data transfer object for removing a collaborator from a playlist.
 * This class extends AddCollaboratorDto and uses the same structure,
 * where the collaborator ID is required to be specified to remove them.
 *
 * @extends AddCollaboratorDto
 */
export default class RemoveCollaboratorDto extends AddCollaboratorDto {}
