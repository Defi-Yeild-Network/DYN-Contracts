const { expectRevert } = require('@openzeppelin/test-helpers');
const DeFiYieldNetwork = artifacts.require('DeFiYieldNetwork');

contract('DeFiYieldNetwork', ([alice, bob, carol]) => {
    beforeEach(async () => {
        this.dyn = await DeFiYieldNetwork.new({ from: alice });
    });


    it('Name CHECKED, Symbol CHECKED, Decimals CHECKED, TotalSupply CHECKED', async () => {
        const name = await this.dyn.name();
        const symbol = await this.dnp.symbol();
        const decimals = await this.dyn.decimals();
        const totalSupply = await this.dyn.totalSupply();
        const aliceBal = await this.dyn.balanceOf(alice);
        assert.equal(name.valueOf(), 'DeFiYieldNetwork');
        assert.equal(symbol.valueOf(), 'DYn');
        assert.equal(decimals.valueOf(), '18');
        assert.equal(totalSupply.valueOf(), '60000000000000000000000000');
        /*  
            TotalSupply has to be equal with AliceBalance, because 
            we've minted all the tokens from the beggining! ;)
        */
        assert.equal(aliceBal, '60000000000000000000000000');
    });


    it('Token transfer CHECKED', async () => {
        await this.dyn.transfer(carol, '10', { from: alice });        
        await this.dyn.transfer(bob, '20', { from: alice });
        await this.dyn.transfer(carol, '10', { from: bob });
        const aliceBal = await this.dyn.balanceOf(alice);
        const bobBal = await this.dyn.balanceOf(bob);
        const carolBal = await this.dyn.balanceOf(carol);
        assert.equal(carolBal.valueOf(), '20');
        assert.equal(bobBal.valueOf(), '10');
    });

    it('Bad transfer CHECKED', async () => {

        await expectRevert(
            this.dyn.transfer(carol, '100000', { from: bob }),
            'ERC20: transfer amount exceeds balance',
        );
        await expectRevert(
            this.dyn.transfer(alice, '999999', { from: bob }),
            'ERC20: transfer amount exceeds balance',
        );
        await expectRevert(
            this.dyn.transfer(alice, '13', { from: carol }),
            'ERC20: transfer amount exceeds balance',
        );
    });
  });
