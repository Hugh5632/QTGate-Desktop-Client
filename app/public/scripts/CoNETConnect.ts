class CoNETConnect {
	public showSendImapDataWarning = ko.observable ( false )
	public showConnectCoNETProcess = ko.observable ( true )
	public connectStage = ko.observable ( 0 )
	public connetcError = ko.observable ( -1 )
	public connectedCoNET = ko.observable ( false )
	public maynotConnectConet = ko.observable ( false )
	public mayNotMakeImapConnect = ko.observable ( false )
	public Loading = ko.observable ( false )
	public keyPairSign: KnockoutObservable< keyPairSign > = ko.observable ( null )
	constructor ( public email: string, private isKeypairBeSign: boolean, confirmRisk: boolean, public account: string, private ready: ( err, showCoGate? ) => void ) {
		const self = this
		if ( !confirmRisk ) {
			this.showSendImapDataWarning ( true )
		} else {
			this.imapConform ()
			this.Loading ( true )
		}

		socketIo.on ( 'tryConnectCoNETStage', function ( err, stage, showCoGate: boolean ) {
			return self.listingConnectStage ( err, stage, showCoGate )
		})
	}

	public listingConnectStage ( err, stage, showCoGate: boolean ) {
		const self = this
		this.showConnectCoNETProcess ( true )
		let processBarCount = 0
		if ( typeof err === 'number' && err > -1 ) {
			this.connectStage ( -1 )
			this.ready ( err, false )
			return this.connetcError ( err )
		}
		
		if ( stage === 4 ) {
			this.showConnectCoNETProcess ( false )
			this.connectedCoNET ( true )
			processBarCount = 67

			
			if ( !this.isKeypairBeSign ) {
				if ( !this.keyPairSign()) {
					let u = null
					return this.keyPairSign ( u = new keyPairSign (( function () {
						
						self.keyPairSign ( u = null )
						self.ready ( null, showCoGate )
					})))
				}
				return
			}
			
			return this.ready ( null, showCoGate )
			
		}
		
		$('.keyPairProcessBar').progress ({
			percent: processBarCount += 33
		})
		if ( this.connectStage() === 3 ) {
			return
		}
		return this.connectStage ( stage )
		
	}

	public returnToImapSetup () {
		return this.ready ( 0, true )
	}

	public imapConform () {
		this.showSendImapDataWarning ( false )
		this.connetcError ( -1 )
		this.Loading ( true )
		return socketIo.emit11 ( 'tryConnectCoNET' )
	}
}
