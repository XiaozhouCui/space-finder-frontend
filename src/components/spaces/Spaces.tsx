import { Component } from 'react';
import { Space } from '../../model/Model';
import { DataService } from '../../services/DataService';
import { SpaceComponent } from './SpaceComponent';
import { User } from '../../model/Model';
import { ConfirmModalComponent } from './ConfirmModalComponent';
import { Link } from 'react-router-dom';

interface SpacesState {
  spaces: Space[];
  showModal: boolean;
  modalContent: string;
}

interface SpacesProps {
  dataService: DataService;
  user: User | undefined;
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
    const reservationResult = await this.props.dataService.reserveSpace(
      spaceId
    );
    if (reservationResult) {
      this.setState({
        showModal: true,
        modalContent: `You reserved the space with id ${spaceId} and got the reservation number ${reservationResult}`,
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
          key={space.spaceId}
          location={space.location}
          name={space.name}
          photoURL={space.photoURL}
          spaceId={space.spaceId}
          reserveSpace={this.reserveSpace}
        />
      );
    }
    return rows;
  }

  private closeModal() {
    this.setState({
      showModal: false,
      modalContent: '',
    });
  }

  renderCreateSpacesLink() {
    if (this.props.user?.isAdmin) {
      return (
        <div>
          <Link to="/createSpace">Create space</Link>
          <br></br>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h2>Welcome to the Spaces page!</h2>
        {this.renderCreateSpacesLink()}
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
