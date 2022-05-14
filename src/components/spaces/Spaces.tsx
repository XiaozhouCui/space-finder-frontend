import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Space } from '../../model/Model';
import { DataService } from '../../services/DataService';
import { ConfirmModalComponent } from './ConfirmModalComponent';
import { SpaceComponent } from './SpaceComponent';

interface SpacesState {
  spaces: Space[];
  showModal: boolean;
  modalContent: string;
}

interface SpacesProps {
  dataService: DataService;
}

export class Spaces extends Component<SpacesProps, SpacesState> {
  constructor(props: SpacesProps) {
    super(props);
    this.state = {
      spaces: [],
      showModal: false,
      modalContent: '',
    };
    // make callback work
    this.reserveSpace = this.reserveSpace.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  async componentDidMount() {
    const spaces = await this.props.dataService.getSpaces();
    this.setState({ spaces });
  }

  private async reserveSpace(spaceId: string) {
    const result = await this.props.dataService.reserveSpace(spaceId);
    if (result) {
      this.setState({
        showModal: true,
        modalContent: `You reserved the space with id ${spaceId} and got the reservation number ${result}`,
      });
    } else {
      this.setState({
        showModal: true,
        modalContent: `You can't reserve the space with id ${spaceId}`,
      });
    }
  }

  private renderSpaces() {
    const rows: any[] = [];
    for (const space of this.state.spaces) {
      rows.push(
        <SpaceComponent
          location={space.location}
          name={space.name}
          photoURL={space.photoURL}
          spaceId={space.spaceId}
          reserveSpace={this.reserveSpace}
          key={space.spaceId}
        />
      );
    }
    return rows;
  }

  private closeModal() {
    this.setState({ showModal: false, modalContent: '' });
  }

  render() {
    return (
      <div>
        <h2>Welcome to the Spaces page!</h2>
        <Link to="/createSpace">Create space</Link>
        <br />
        {this.renderSpaces()}
        <ConfirmModalComponent
          close={this.closeModal}
          content={this.state.modalContent}
          show={this.state.showModal}
        />
      </div>
    );
  }
}
